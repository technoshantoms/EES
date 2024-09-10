export default class OperationRefund {
    private _account;
    private _htlcContractId;
    private _txHash;
    constructor(_account: string, _htlcContractId: string, _txHash: string);
    static create(account: string, htlcContractId: string, txHash: string): OperationRefund;
    get htlcContractId(): string;
    get txHash(): string;
}
