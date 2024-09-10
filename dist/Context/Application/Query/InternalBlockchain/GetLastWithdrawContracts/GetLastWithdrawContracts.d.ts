import { OperationType } from "context/InternalBlockchain/WithdrawTransactionsCollection";
export default class GetLastWithdrawContracts {
    private _lastOperation;
    private _operationType;
    constructor(_lastOperation: string, _operationType: OperationType);
    get lastOperation(): string;
    get operationType(): OperationType;
}
