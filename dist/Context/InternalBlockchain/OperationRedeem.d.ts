export default class OperationRedeem {
    private _account;
    private _htlcContractId;
    private _secret;
    private _transactionId;
    constructor(_account: string, _htlcContractId: string, _secret: string, _transactionId: string);
    static create(account: string, htlcContractId: string, secret: string, transactionId: string): OperationRedeem;
    get htlcContractId(): string;
    get secret(): string;
}
