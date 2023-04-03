import RepositoryInterface from "./RepositoryInterface";
//@ts-ignore
import {ChainTypes} from "@revolutionpopuli/revpopjs";
//@ts-ignore
import {Apis, ChainConfig} from "@revolutionpopuli/revpopjs-ws";
//@ts-ignore
import {Aes, FetchChain, TransactionBuilder, PrivateKey, ChainStore} from "@revolutionpopuli/revpopjs";
import * as Errors from "context/InternalBlockchain/Errors";
import {InternalBlockchainConnectionError} from "context/Infrastructure/Errors";
import Memo from "context/InternalBlockchain/Memo";
import Contract from "context/InternalBlockchain/HtlcContract";
import OperationRedeem from "../OperationRedeem";
import OperationRefund from "../OperationRefund";

const PREIMAGE_HASH_CIPHER_SHA256 = 2
const PREIMAGE_LENGTH = 32

export default class RevpopRepository implements RepositoryInterface {
    private memo: Memo

    public constructor(private readonly eesAccount: string, private readonly accountPrivateKey: string, private readonly assetSymbol: string) {
        this.memo = new Memo()
    }

    public static async init(nodeUrl: string, accountFrom: string, accountPrivateKey: string, assetSymbol: string, chainId: string): Promise<RevpopRepository> {
        ChainConfig.networks["RevPop"].chain_id = chainId
        ChainConfig.setChainId(chainId)
        const repository = new RevpopRepository(accountFrom, accountPrivateKey, assetSymbol)
        await repository.connect(nodeUrl)
        return repository
    }

    async createContract(externalId: string, accountToName: string, amount: number, hashLock: string, timeLock: number) {
        const accountFrom = await FetchChain("getAccount", this.eesAccount)
        const accountTo = await FetchChain("getAccount", accountToName)

        if (null === accountTo) {
            throw new Errors.AccountNotFound(accountToName)
        }

        const privateKey = PrivateKey.fromWif(this.accountPrivateKey)

        const asset = await FetchChain("getAsset", this.assetSymbol)

        if (asset === null) {
            throw new Errors.AssetNotFoundError(this.assetSymbol)
        }

        const amountWithPrecision = amount * Math.pow(10, asset.get('precision'))

        const txIssueAsset = new TransactionBuilder();
        txIssueAsset.add_type_operation("asset_issue", {
            fee: {
                amount: 0, asset_id: 0
            }, issuer: accountFrom.get('id'), asset_to_issue: {
                amount: amountWithPrecision, asset_id: asset.get("id")
            }, issue_to_account: accountFrom.get("id")
        });
        txIssueAsset.set_required_fees()
        txIssueAsset.add_signer(privateKey)

        try {
            await txIssueAsset.broadcast()
        } catch (e: unknown) {
            throw new Errors.IssueAssetError()
        }

        const txHtlcCreate = new TransactionBuilder();
        txHtlcCreate.add_type_operation("htlc_create", {
            from: accountFrom.get('id'),
            to: accountTo.get('id'),
            fee: {
                amount: 0, asset_id: 0
            },
            amount: {
                amount: amountWithPrecision, asset_id: asset.get('id')
            },
            preimage_hash: [PREIMAGE_HASH_CIPHER_SHA256, hashLock],
            preimage_size: PREIMAGE_LENGTH,
            claim_period_seconds: timeLock,
            extensions: {
                memo: this.memo.generate(externalId.slice(2), privateKey, accountFrom, accountTo)
            }
        });

        txHtlcCreate.set_required_fees()
        txHtlcCreate.add_signer(privateKey)

        try {
            await txHtlcCreate.broadcast()
        } catch (e: unknown) {
            throw new Errors.CreateHtlcError()
        }
    }

    async getIncomingContracts(start: string): Promise<Contract[]> {
        const revpopContracts = await Apis.instance()
            .db_api()
            .exec("get_htlc_by_from", [this.eesAccount, start, 100])

        const privateKey = PrivateKey.fromWif(this.accountPrivateKey)

        const contracts = []
        for (const contract of revpopContracts) {
            try {
                const message = Aes.decrypt_with_checksum(privateKey, contract.memo.to, contract.memo.nonce, contract.memo.message).toString("utf-8")

                contracts.push(new Contract(contract.id, message))
            } catch (e: unknown) {
                continue;
            }
        }

        return contracts
    }

    async getRedeemOperations(account: string): Promise<OperationRedeem[]> {
        const revpopOperations = await Apis.instance()
            .history_api()
            .exec("get_account_history_by_operations", [account, [ChainTypes.operations.htlc_redeem], 0, 100])

        const operations = []
        for (const revpopOperation of revpopOperations.operation_history_objs) {
            operations.push(OperationRedeem.create(account, revpopOperation['op'][1]['htlc_id'], Buffer.from(revpopOperation['op'][1]['preimage'], 'hex').toString(), revpopOperation['id'],))
        }

        return operations
    }

    async getRefundOperations(account: string): Promise<OperationRefund[]> {
        const mostRecently = '1.' + ChainTypes.object_type.operation_history + '.0'
        const revpopOperations = await Apis.instance()
            .history_api()
            .exec("get_account_history", [this.eesAccount, mostRecently, 100, mostRecently])

        const operations = []
        for (const revpopOperation of revpopOperations) {
            if (revpopOperation['op'][0] == ChainTypes.operations.htlc_refund) {
                operations.push(OperationRefund.create(account, revpopOperation['op'][1]['htlc_id'], revpopOperation['id']))
            }
        }

        return operations
    }

    public async connect(nodeUrl: string) {
        try {
            await Apis.instance(nodeUrl, true).init_promise
        } catch (e: unknown) {
            throw new InternalBlockchainConnectionError(`Can't connect to the url ${nodeUrl}`)
        }
    }

    public async disconnect() {
        Apis.close()
    }

    async burnAsset(amount: number) {
        const accountTo = await FetchChain("getAccount", this.eesAccount)

        if (null === accountTo) {
            throw new Errors.AccountNotFound(this.eesAccount)
        }

        const privateKey = PrivateKey.fromWif(this.accountPrivateKey)

        const asset = await FetchChain("getAsset", this.assetSymbol)

        if (asset === null) {
            throw new Errors.AssetNotFoundError(this.assetSymbol)
        }

        const txReserveAsset = new TransactionBuilder();
        txReserveAsset.add_type_operation("asset_reserve", {
            fee: {
                amount: 0, asset_id: 0
            }, payer: accountTo.get('id'), amount_to_reserve: {
                amount: amount, asset_id: asset.get("id")
            },
        });
        txReserveAsset.set_required_fees()
        txReserveAsset.add_signer(privateKey)

        try {
            await txReserveAsset.broadcast()
        } catch (e: unknown) {
            throw new Errors.ReserveAssetError()
        }
    }
}
