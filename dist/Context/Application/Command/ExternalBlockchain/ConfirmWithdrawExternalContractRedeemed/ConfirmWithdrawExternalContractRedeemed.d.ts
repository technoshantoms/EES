export default class ConfirmWithdrawExternalContractRedeemed {
    private _txHash;
    private _contractId;
    constructor(_txHash: string, _contractId: string);
    get txHash(): string;
    get contractId(): string;
}
