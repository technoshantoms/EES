import { TransactionReceipt } from "web3-core";
import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";
import RedeemWithdrawRequest from "../../Domain/ExternalBlockchain/RedeemWithdrawRequest";
import RedeemWithdrawResponse from "../../Domain/ExternalBlockchain/RedeemWithdrawResponse";
import MakeDepositRefundRequest from "../../Domain/ExternalBlockchain/MakeDepositRefundRequest";
import MakeDepositRefundResponse from "../../Domain/ExternalBlockchain/MakeDepositRefundResponse";
export default class StubRepository implements ExternalBlockchainRepositoryInterface {
    private _requests;
    private _status;
    private _txHash;
    private _chainId;
    private _redeemWithdrawRequests;
    create(request: CreateNewContractRequest): Promise<CreateNewContractResponse>;
    getTransactionReceipt(txHash: string): Promise<TransactionReceipt | null>;
    getContract(contractId: string, contractAddress: string): Promise<any | null>;
    getChainId(): Promise<number>;
    get size(): number;
    clean(): void;
    get last(): CreateNewContractRequest | null;
    get txHash(): string;
    set txHash(value: string);
    set status(value: boolean);
    set chainId(value: number);
    redeemWithdraw(request: RedeemWithdrawRequest): Promise<RedeemWithdrawResponse>;
    refundDeposit(request: MakeDepositRefundRequest): Promise<MakeDepositRefundResponse>;
}
