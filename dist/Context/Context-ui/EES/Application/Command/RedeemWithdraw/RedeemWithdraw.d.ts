export default class RedeemWithdraw {
    private _contractId;
    private _receiverAddress;
    private _preimage;
    private _sessionId;
    constructor(_contractId: string, _receiverAddress: string, _preimage: string, _sessionId: string);
    get contractId(): string;
    get receiverAddress(): string;
    get preimage(): string;
    get sessionId(): string;
}
