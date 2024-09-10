export default class MakeDepositRefundResponse {
    private _success;
    private _txHash;
    private _errorMessage;
    constructor(_success: boolean, _txHash: string, _errorMessage?: string);
    get success(): boolean;
    get txHash(): string;
    get errorMessage(): string;
}
