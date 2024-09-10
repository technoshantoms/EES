export default class ConfirmDepositExternalContractRedeemed {
    private _txHash;
    constructor(_txHash: string);
    get blockchain(): string;
    get txHash(): string;
}
