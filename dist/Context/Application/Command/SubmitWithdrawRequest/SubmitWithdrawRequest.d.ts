export default class SubmitWithdrawRequest {
    private _nativeAccount;
    private _amountToPayInRQETH;
    private _addressOfUserInEthereum;
    private _withdrawalFeeAmount;
    private _withdrawalFeeCurrency;
    constructor(_nativeAccount: string, _amountToPayInRQETH: number, _addressOfUserInEthereum: string, _withdrawalFeeAmount: number, _withdrawalFeeCurrency: string);
    get nativeAccount(): string;
    get amountToPayInRQETH(): number;
    get addressOfUserInEthereum(): string;
    get withdrawalFeeAmount(): number;
    get withdrawalFeeCurrency(): string;
}
