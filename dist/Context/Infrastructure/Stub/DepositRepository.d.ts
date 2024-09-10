import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import Deposit from "../../Domain/Deposit";
export default class DepositRepository implements DepositRepositoryInterface {
    _exists: boolean;
    private _deposits;
    create(deposit: Deposit): void;
    save(deposit: Deposit): void;
    exists(contractId: string): Promise<boolean>;
    getById(id: string): Promise<Deposit | null>;
    getByRequestId(requestId: string): Promise<Deposit | null>;
    getByTxHash(txHash: string): Promise<Deposit | null>;
    getWaitingToRedeem(): Promise<Deposit[]>;
    first(): Deposit | null;
    get size(): number;
    reset(): void;
    getByRedeemTxHash(txHash: string): Promise<Deposit | null>;
    getByBurnTxHash(txHash: string): Promise<Deposit | null>;
    getOverdueTimeLock(): Promise<Deposit[]>;
    getBurned(): Promise<Deposit[]>;
    getByContractId(contractId: string): Promise<Deposit | null>;
    getByRequestIds(requestIds: string[]): Promise<Deposit[]>;
}
