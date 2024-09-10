import AggregateRoot from "../Core/Domain/AggregateRoot";
import NativeAccount from "./ValueObject/NativeAccount";
export declare const STATUS_CREATED = 1;
export declare const STATUS_WITHDRAW_CREATED = 5;
export default class WithdrawRequest extends AggregateRoot {
    private _nativeAccount;
    private _amountToPayInRQETH;
    private _addressOfUserInEthereum;
    private _withdrawalFeeAmount;
    private _withdrawalFeeCurrency;
    private _status;
    private constructor();
    get nativeAccount(): NativeAccount;
    get amountToPayInRQETH(): number;
    get addressOfUserInEthereum(): string;
    get status(): number;
    get withdrawalFeeAmount(): number;
    get withdrawalFeeCurrency(): string;
    static create(nativeAccount: NativeAccount, amountToPayInRQETH: number, addressOfUserInEthereum: string, withdrawalFeeAmount: number, withdrawalFeeCurrency: string): WithdrawRequest;
    withdrawCreated(): void;
}
