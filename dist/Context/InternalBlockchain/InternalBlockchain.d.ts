import RepositoryInterface from "./Repository/RepositoryInterface";
import Contract from "context/InternalBlockchain/HtlcContract";
import OperationRedeem from "./OperationRedeem";
import OperationRefund from "context/InternalBlockchain/OperationRefund";
import OperationBurn from "context/InternalBlockchain/OperationBurn";
import WithdrawTransaction from "context/InternalBlockchain/WithdrawTransaction";
import { Map } from "immutable";
type Repository = "native" | "stub";
interface Config {
    repository: Repository;
}
declare class InternalBlockchain {
    private readonly _repository;
    constructor(_repository: RepositoryInterface);
    static init(config: Config): Promise<InternalBlockchain>;
    disconnect(): void;
    static createRepository(repository: Repository): Promise<RepositoryInterface>;
    get repository(): RepositoryInterface;
    createContract(externalId: string, accountToName: string, amount: string, hashLock: string, timeLock: number): Promise<void>;
    getIncomingContracts(start: string): Promise<Contract[]>;
    getRefundOperations(account: string): Promise<OperationRefund[]>;
    getRedeemOperations(account: string): Promise<OperationRedeem[]>;
    burnAsset(amount: string): Promise<void>;
    getBurnOperations(account: string): Promise<OperationBurn[]>;
    getInternalAsset(): Promise<Map<string, any>>;
    getAsset(assetId: string): Promise<Map<string, any>>;
    getAccountHistory(lastProcessedAccountHistoryOperation: string): Promise<WithdrawTransaction[]>;
    getAccount(accountId: string): Promise<Map<string, any>>;
    getEesAccount(): Promise<Map<string, any>>;
    getObject(objectId: string): Promise<Map<string, any>>;
    getLastIrreversibleBlockNumber(): Promise<number>;
    withdrawRedeem(preimage: string, contractId: string, amount: string): Promise<void>;
}
export default InternalBlockchain;
