import RepositoryInterface from "./RepositoryInterface";
import Contract from "context/InternalBlockchain/HtlcContract";
import OperationRedeem from "../OperationRedeem";
import OperationBurn from "context/InternalBlockchain/OperationBurn";
import OperationRefund from "context/InternalBlockchain/OperationRefund";
import { Map } from "immutable";
import WithdrawTransaction from "context/InternalBlockchain/WithdrawTransaction";
interface ContractInfo {
    externalId: string;
    accountToName: string;
    amount: string;
    hashLock: string;
    timeLock: number;
}
export default class StubRepository implements RepositoryInterface {
    private _newContracts;
    private _internalContracts;
    private _operationsRedeem;
    private _operationsBurn;
    createContract(externalId: string, accountToName: string, amount: string, hashLock: string, timeLock: number): void;
    get contracts(): ContractInfo[];
    addInternalContract(contract: Contract): void;
    getIncomingContracts(start: string): Promise<Contract[]>;
    getRefundOperations(account: string): Promise<OperationRefund[]>;
    addRedeemOperation(operationRedeem: OperationRedeem): Promise<void>;
    getRedeemOperations(account: string): Promise<OperationRedeem[]>;
    disconnect(): Promise<undefined>;
    burnAsset(amount: string): void;
    getInternalAsset(): Promise<Map<string, any>>;
    getAsset(assetId: string): Promise<Map<string, any>>;
    getAccountHistory(lastProcessedAccountHistoryOperation: string): Promise<WithdrawTransaction[]>;
    getAccount(accountId: string): Promise<Map<string, any>>;
    getEesAccount(): Promise<Map<string, any>>;
    addBurnOperation(operationBurn: OperationBurn): Promise<void>;
    getBurnOperations(account: string): Promise<OperationBurn[]>;
    getObject(objectId: string): Promise<Map<string, any>>;
    getLastIrreversibleBlockNumber(): Promise<number>;
    withdrawRedeem(preimage: string, contractId: string, amount: string): Promise<void>;
}
export {};
