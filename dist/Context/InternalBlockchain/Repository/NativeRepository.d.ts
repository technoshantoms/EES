import RepositoryInterface from "./RepositoryInterface";
import Contract from "context/InternalBlockchain/HtlcContract";
import OperationRedeem from "../OperationRedeem";
import OperationBurn from "context/InternalBlockchain/OperationBurn";
import OperationRefund from "../OperationRefund";
import WithdrawTransaction from "context/InternalBlockchain/WithdrawTransaction";
import { Map } from "immutable";
export default class NativeRepository implements RepositoryInterface {
    private readonly eesAccount;
    private readonly accountPrivateKey;
    private readonly assetSymbol;
    private memo;
    constructor(eesAccount: string, accountPrivateKey: string, assetSymbol: string);
    static init(nodeUrl: string, accountFrom: string, accountPrivateKey: string, assetSymbol: string, chainId: string): Promise<NativeRepository>;
    createContract(externalId: string, accountToName: string, amount: string, hashLock: string, timeLock: number): Promise<void>;
    getIncomingContracts(start: string): Promise<Contract[]>;
    getRedeemOperations(account: string): Promise<OperationRedeem[]>;
    getRefundOperations(account: string): Promise<OperationRefund[]>;
    connect(nodeUrl: string): Promise<void>;
    disconnect(): Promise<void>;
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
