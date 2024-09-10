export default class MakeDepositRefundRequest {
    private _contractId;
    private _contractAddress;
    private _sender;
    constructor(_contractId: string, _contractAddress: string, _sender: string);
    get contractId(): string;
    get contractAddress(): string;
    get sender(): string;
}
