export default class ExternalDepositRedeem {
    private _txHash;
    private _contractId;
    constructor(_txHash: string, _contractId: string);
    get blockchain(): string;
    get txHash(): string;
    get contractId(): string;
}
