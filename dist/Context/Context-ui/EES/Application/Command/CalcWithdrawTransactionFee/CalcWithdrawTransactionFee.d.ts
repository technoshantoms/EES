import { Map } from "immutable";
export default class CalcWithdrawTransactionFee {
    private _assetId;
    private _account;
    constructor(_assetId: string, _account: Map<string, any>);
    get assetId(): string;
    get account(): Map<string, any>;
}
