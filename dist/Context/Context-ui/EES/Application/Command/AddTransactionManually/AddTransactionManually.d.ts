export default class AddTransactionManually {
    private _sessionId;
    private _txHash;
    constructor(_sessionId: string, _txHash: string);
    get sessionId(): string;
    get txHash(): string;
}
