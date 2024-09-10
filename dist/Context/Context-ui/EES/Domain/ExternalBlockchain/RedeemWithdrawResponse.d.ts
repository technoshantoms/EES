export default class RedeemWithdrawResponse {
    private _success;
    private _txHash;
    constructor(_success: boolean, _txHash: string);
    get success(): boolean;
    get txHash(): string;
}
