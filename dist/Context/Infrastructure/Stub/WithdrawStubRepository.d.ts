import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import Withdraw from "context/Domain/Withdraw";
export default class WithdrawStubRepository implements WithdrawRepositoryInterface {
    _exists: boolean;
    private _withdraws;
    save(withdraw: Withdraw): void;
    getAllForCheck(): Promise<Withdraw[]>;
    getById(id: string): Promise<Withdraw | null>;
    getByRequestId(requestId: string): Promise<Withdraw | null>;
    getByTxHash(txHash: string): Promise<Withdraw | null>;
    getByRedeemTxHash(txHash: string): Promise<Withdraw | null>;
    getByExternalContractId(contractId: string): Promise<Withdraw | null>;
    getByRedeemStatus(): Promise<Withdraw[]>;
    getByInternalContractId(contractId: string): Promise<Withdraw | null>;
    getAllRedeemed(): Promise<Withdraw[]>;
    getAllReadyToRefund(): Promise<Withdraw[]>;
    getByRefundTxHash(txHash: string): Promise<Withdraw | null>;
}
