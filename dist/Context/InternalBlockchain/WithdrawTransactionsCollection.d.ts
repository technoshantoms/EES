import WithdrawTransaction from "context/InternalBlockchain/WithdrawTransaction";
export declare enum OperationType {
    Create = 0,
    Redeem = 1
}
export declare class WithdrawTransactionsCollection {
    private eesAccountId;
    private operationType;
    private _transactions;
    constructor(eesAccountId: string, operationType: OperationType);
    get transactions(): WithdrawTransaction[];
    add(operation: any): void;
    private isTransfer;
    private addTransferOperation;
    private isHtlcCreate;
    private isHtlcRedeem;
    private addHtlcCreateOperation;
    private getTransaction;
    private addHtlcRedeemOperation;
}
