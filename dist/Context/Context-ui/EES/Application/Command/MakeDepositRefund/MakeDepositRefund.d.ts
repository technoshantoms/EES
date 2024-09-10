export default class MakeDepositRefund {
    private _sessionId;
    private _contractAddress;
    constructor(_sessionId: string, _contractAddress: string);
    get sessionId(): string;
    get contractAddress(): string;
}
