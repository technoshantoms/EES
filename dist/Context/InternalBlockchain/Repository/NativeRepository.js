"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rsquared_js_1 = require("@r-squared/rsquared-js");
const rsquared_js_ws_1 = require("@r-squared/rsquared-js-ws");
const rsquared_js_2 = require("@r-squared/rsquared-js");
const Errors = __importStar(require("../Errors"));
const Errors_1 = require("../../Infrastructure/Errors");
const Memo_1 = __importDefault(require("../Memo"));
const HtlcContract_1 = __importDefault(require("../HtlcContract"));
const OperationRedeem_1 = __importDefault(require("../OperationRedeem"));
const OperationBurn_1 = __importDefault(require("../OperationBurn"));
const OperationRefund_1 = __importDefault(require("../OperationRefund"));
const immutable_1 = require("immutable");
const PREIMAGE_HASH_CIPHER_SHA256 = 2;
const PREIMAGE_LENGTH = 32;
class NativeRepository {
    constructor(eesAccount, accountPrivateKey, assetSymbol) {
        this.eesAccount = eesAccount;
        this.accountPrivateKey = accountPrivateKey;
        this.assetSymbol = assetSymbol;
        this.memo = new Memo_1.default();
    }
    static async init(nodeUrl, accountFrom, accountPrivateKey, assetSymbol, chainId) {
        rsquared_js_ws_1.ChainConfig.networks["RSquared"].chain_id = chainId;
        rsquared_js_ws_1.ChainConfig.setChainId(chainId);
        const repository = new NativeRepository(accountFrom, accountPrivateKey, assetSymbol);
        await repository.connect(nodeUrl);
        return repository;
    }
    async createContract(externalId, accountToName, amount, hashLock, timeLock) {
        const accountFrom = await (0, rsquared_js_2.FetchChain)("getAccount", this.eesAccount);
        const accountTo = await (0, rsquared_js_2.FetchChain)("getAccount", accountToName);
        if (null === accountTo) {
            throw new Errors.AccountNotFound(accountToName);
        }
        const privateKey = rsquared_js_2.PrivateKey.fromWif(this.accountPrivateKey);
        const asset = await this.getInternalAsset();
        const txIssueAsset = new rsquared_js_2.TransactionBuilder();
        txIssueAsset.add_type_operation("asset_issue", {
            fee: {
                amount: 0,
                asset_id: 0,
            },
            issuer: accountFrom.get("id"),
            asset_to_issue: {
                amount: amount,
                asset_id: asset.get("id"),
            },
            issue_to_account: accountFrom.get("id"),
        });
        txIssueAsset.set_required_fees();
        txIssueAsset.add_signer(privateKey);
        try {
            await txIssueAsset.broadcast();
        }
        catch (e) {
            throw new Errors.IssueAssetError();
        }
        const txHtlcCreate = new rsquared_js_2.TransactionBuilder();
        txHtlcCreate.add_type_operation("htlc_create", {
            from: accountFrom.get("id"),
            to: accountTo.get("id"),
            fee: {
                amount: 0,
                asset_id: 0,
            },
            amount: {
                amount: amount,
                asset_id: asset.get("id"),
            },
            preimage_hash: [PREIMAGE_HASH_CIPHER_SHA256, hashLock],
            preimage_size: PREIMAGE_LENGTH,
            claim_period_seconds: timeLock,
            extensions: {
                memo: this.memo.generate(externalId.slice(2), privateKey, accountFrom, accountTo),
            },
        });
        txHtlcCreate.set_required_fees();
        txHtlcCreate.add_signer(privateKey);
        try {
            await txHtlcCreate.broadcast();
        }
        catch (e) {
            throw new Errors.CreateHtlcError();
        }
    }
    async getIncomingContracts(start) {
        const nativeContracts = await rsquared_js_ws_1.Apis.instance().db_api().exec("get_htlc_by_from", [this.eesAccount, start, 100]);
        const privateKey = rsquared_js_2.PrivateKey.fromWif(this.accountPrivateKey);
        const contracts = [];
        for (const contract of nativeContracts) {
            try {
                const message = rsquared_js_2.Aes.decrypt_with_checksum(privateKey, contract.memo.to, contract.memo.nonce, contract.memo.message).toString("utf-8");
                contracts.push(new HtlcContract_1.default(contract.id, message));
            }
            catch (e) {
                continue;
            }
        }
        return contracts;
    }
    async getRedeemOperations(account) {
        const nativeOperations = await rsquared_js_ws_1.Apis.instance()
            .history_api()
            .exec("get_account_history_operations", [
            account,
            rsquared_js_1.ChainTypes.operations.htlc_redeem,
            "1.11.0",
            "1.11.0",
            100,
        ]);
        const operations = [];
        for (const nativeOperation of nativeOperations) {
            operations.push(OperationRedeem_1.default.create(account, nativeOperation["op"][1]["htlc_id"], Buffer.from(nativeOperation["op"][1]["preimage"], "hex").toString(), nativeOperation["id"]));
        }
        return operations;
    }
    async getRefundOperations(account) {
        const mostRecently = "1." + rsquared_js_1.ChainTypes.object_type.operation_history + ".0";
        const nativeOperations = await rsquared_js_ws_1.Apis.instance()
            .history_api()
            .exec("get_account_history", [this.eesAccount, mostRecently, 100, mostRecently]);
        const operations = [];
        for (const nativeOperation of nativeOperations) {
            if (nativeOperation["op"][0] == rsquared_js_1.ChainTypes.operations.htlc_refund) {
                operations.push(OperationRefund_1.default.create(account, nativeOperation["op"][1]["htlc_id"], nativeOperation["id"]));
            }
        }
        return operations;
    }
    async connect(nodeUrl) {
        try {
            await rsquared_js_ws_1.Apis.instance(nodeUrl, true).init_promise;
        }
        catch (e) {
            throw new Errors_1.InternalBlockchainConnectionError(`Can't connect to the url ${nodeUrl}`);
        }
    }
    async disconnect() {
        rsquared_js_ws_1.Apis.close();
    }
    async burnAsset(amount) {
        const accountTo = await this.getEesAccount();
        const privateKey = rsquared_js_2.PrivateKey.fromWif(this.accountPrivateKey);
        const asset = await (0, rsquared_js_2.FetchChain)("getAsset", this.assetSymbol);
        if (asset === null) {
            throw new Errors.AssetNotFoundError(this.assetSymbol);
        }
        const txReserveAsset = new rsquared_js_2.TransactionBuilder();
        txReserveAsset.add_type_operation("asset_reserve", {
            fee: {
                amount: 0,
                asset_id: 0,
            },
            payer: accountTo.get("id"),
            amount_to_reserve: {
                amount: amount,
                asset_id: asset.get("id"),
            },
        });
        txReserveAsset.set_required_fees();
        txReserveAsset.add_signer(privateKey);
        try {
            await txReserveAsset.broadcast();
        }
        catch (e) {
            throw new Errors.ReserveAssetError();
        }
    }
    async getBurnOperations(account) {
        const mostRecently = "1." + rsquared_js_1.ChainTypes.object_type.operation_history + ".0";
        const nativeOperations = await rsquared_js_ws_1.Apis.instance()
            .history_api()
            .exec("get_account_history", [this.eesAccount, mostRecently, 100, mostRecently]);
        const operations = [];
        for (const nativeOperation of nativeOperations) {
            if (nativeOperation["op"][0] == rsquared_js_1.ChainTypes.operations.asset_reserve) {
                operations.push(OperationBurn_1.default.create(account, nativeOperation["id"]));
            }
        }
        return operations;
    }
    async getInternalAsset() {
        return await this.getAsset(this.assetSymbol);
    }
    async getAsset(assetId) {
        const [result] = await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_assets", [[assetId]]);
        return (0, immutable_1.Map)(result);
    }
    async getAccountHistory(lastProcessedAccountHistoryOperation) {
        const nativeOperations = await rsquared_js_ws_1.Apis.instance()
            .history_api()
            .exec("get_account_history", [
            this.eesAccount,
            lastProcessedAccountHistoryOperation,
            100,
            "1." + rsquared_js_1.ChainTypes.object_type.operation_history + ".0",
        ]);
        const transactions = [];
        for (const nativeOperation of nativeOperations) {
            if (nativeOperation["op"][0] == rsquared_js_1.ChainTypes.operations.transfer ||
                nativeOperation["op"][0] == rsquared_js_1.ChainTypes.operations.htlc_create ||
                nativeOperation["op"][0] == rsquared_js_1.ChainTypes.operations.htlc_redeemed) {
                transactions.push(nativeOperation);
            }
        }
        return transactions;
    }
    async getAccount(accountId) {
        const account = await (0, rsquared_js_2.FetchChain)("getAccount", accountId);
        if (null === account) {
            throw new Errors.AccountNotFound(account);
        }
        return account;
    }
    async getEesAccount() {
        return await this.getAccount(this.eesAccount);
    }
    async getObject(objectId) {
        const [result] = await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_objects", [[objectId]]);
        return (0, immutable_1.Map)(result);
    }
    async getLastIrreversibleBlockNumber() {
        const dynamicProperties = await this.getObject("2.1.0");
        return parseInt(dynamicProperties.get("last_irreversible_block_num"));
    }
    async withdrawRedeem(preimage, contractId, amount) {
        const accountTo = await this.getEesAccount();
        const privateKey = rsquared_js_2.PrivateKey.fromWif(this.accountPrivateKey);
        const asset = await this.getAsset(this.assetSymbol);
        if (asset === null) {
            throw new Errors.AssetNotFoundError(this.assetSymbol);
        }
        const txRedeem = new rsquared_js_2.TransactionBuilder();
        txRedeem.add_type_operation("htlc_redeem", {
            preimage: preimage.replace("0x", ""),
            fee: {
                amount: 0,
                asset_id: asset.get("id"),
            },
            htlc_id: contractId,
            redeemer: accountTo.get("id"),
        });
        txRedeem.add_type_operation("asset_reserve", {
            fee: {
                amount: 0,
                asset_id: 0,
            },
            payer: accountTo.get("id"),
            amount_to_reserve: {
                amount: amount,
                asset_id: asset.get("id"),
            },
        });
        txRedeem.set_required_fees();
        txRedeem.add_signer(privateKey);
        try {
            await txRedeem.broadcast();
        }
        catch (e) {
            throw new Errors.CreateHtlcError();
        }
    }
}
exports.default = NativeRepository;
//# sourceMappingURL=NativeRepository.js.map