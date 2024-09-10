import { DataSource } from "typeorm";
import DepositRepositoryInterface from "../../Domain/DepositRepositoryInterface";
import Deposit from "../../Domain/Deposit";
export default class TypeOrmRepository implements DepositRepositoryInterface {
    private _datasource;
    constructor(_datasource: DataSource);
    create(deposit: Deposit): Promise<void>;
    save(deposit: Deposit): Promise<void>;
    exists(contractId: string): Promise<boolean>;
    getById(id: string): Promise<Deposit | null>;
    getByRequestId(requestId: string): Promise<Deposit | null>;
    getByTxHash(txHash: string): Promise<Deposit | null>;
    getWaitingToRedeem(): Promise<Deposit[]>;
    getByRedeemTxHash(txHash: string): Promise<Deposit | null>;
    getByBurnTxHash(txHash: string): Promise<Deposit | null>;
    getOverdueTimeLock(): Promise<Deposit[]>;
    getBurned(): Promise<Deposit[]>;
    getByContractId(contractId: string): Promise<Deposit | null>;
    getByRequestIds(requestIds: string[]): Promise<Deposit[]>;
}
