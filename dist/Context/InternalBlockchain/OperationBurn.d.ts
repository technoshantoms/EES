export default class OperationBurn {
    private _account;
    private _txHash;
    constructor(_account: string, _txHash: string);
    static create(account: string, txHash: string): OperationBurn;
    get txHash(): string;
}
