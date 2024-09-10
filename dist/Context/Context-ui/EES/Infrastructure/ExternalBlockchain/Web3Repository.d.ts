import { TransactionReceipt } from "web3-core";
import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";
import RedeemWithdrawRequest from "../../Domain/ExternalBlockchain/RedeemWithdrawRequest";
import RedeemWithdrawResponse from "../../Domain/ExternalBlockchain/RedeemWithdrawResponse";
import MakeDepositRefundRequest from "../../Domain/ExternalBlockchain/MakeDepositRefundRequest";
import MakeDepositRefundResponse from "../../Domain/ExternalBlockchain/MakeDepositRefundResponse";
export default class Web3Repository implements ExternalBlockchainRepositoryInterface {
    create(command: CreateNewContractRequest): Promise<CreateNewContractResponse>;
    getTransactionReceipt(txHash: string): Promise<TransactionReceipt | null>;
    getContract(contractId: string, contractAddress: string): Promise<any | null>;
    getChainId(): Promise<number>;
    redeemWithdraw(request: RedeemWithdrawRequest): Promise<RedeemWithdrawResponse>;
    getCurrentAddress(): Promise<string | null>;
    refundDeposit(makeDepositRefundRequest: MakeDepositRefundRequest): Promise<MakeDepositRefundResponse>;
}
