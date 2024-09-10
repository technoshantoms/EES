export default class SubmitWithdrawRequest {
    private _rsquaredAccount;
    private _value;
    private _withdrawalFeeCurrency;
    private _withdrawalFeeAmount;
    private _transactionFeeCurrency;
    private _transactionFeeAmount;
    private _hashLock;
    private _ethereumAddress;
    constructor(_rsquaredAccount: string, _value: number, _withdrawalFeeCurrency: string, _withdrawalFeeAmount: number, _transactionFeeCurrency: string, _transactionFeeAmount: number, _hashLock: string, _ethereumAddress: string);
    get rsquaredAccount(): string;
    get value(): number;
    get withdrawalFeeCurrency(): string;
    get withdrawalFeeAmount(): number;
    get transactionFeeCurrency(): string;
    get transactionFeeAmount(): number;
    get hashLock(): string;
    get ethereumAddress(): string;
}
