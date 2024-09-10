export default class ConfirmDepositInternalContractCreated {
    private _txHash;
    private _internalId;
    constructor(_txHash: string, _internalId: string);
    get internalId(): string;
    get txHash(): string;
}
