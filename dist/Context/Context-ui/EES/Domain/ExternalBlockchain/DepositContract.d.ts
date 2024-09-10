export default class DepositContract {
    private readonly _txHash;
    private _withdrawn;
    private _refunded;
    constructor(_txHash: string);
    static create(txHash: string): DepositContract;
    get txHash(): string;
}
