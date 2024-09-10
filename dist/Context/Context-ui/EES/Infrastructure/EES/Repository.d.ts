import RepositoryInterface, { EESSettings } from "../../Domain/EES/RepositoryInterface";
export default class Repository implements RepositoryInterface {
    loadEESSettings(): Promise<EESSettings>;
    createDepositRequest(internalAccount: string, hashLock: string): Promise<string>;
    createWithdrawRequest(internalAccount: string, amountToPayInRQETH: number, addressOfUserInEthereum: string, withdrawalFeeAmount: number, withdrawalFeeCurrency: string): Promise<string>;
    checkDepositSubmittedToInternalBlockchain(sessionId: string): Promise<boolean>;
    getWithdrawExternalContractId(sessionId: string): Promise<string>;
    getDepositExternalContractRefundData(sessionId: string): Promise<{
        contractId: string;
        sender: string;
        refundedInExternalBlockchain: boolean;
    }>;
    getDepositsStatuses(sessionIds: string[]): Promise<{
        sessionId: string;
        status: number;
    }[]>;
    private ensureHasPrefix;
}
