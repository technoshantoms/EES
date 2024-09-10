export default class RedeemWithdrawRequest {
    private _contractId;
    private _preimage;
    private _senderAddress;
    private _contractAddress;
    private _receiver;
    constructor(_contractId: string, _preimage: string, _senderAddress: string, _contractAddress: string, _receiver: string);
    get contractId(): string;
    get preimage(): string;
    get senderAddress(): string;
    get contractAddress(): string;
    get receiver(): string;
}
