"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmitWithdrawRequest {
    constructor(_rsquaredAccount, _value, _withdrawalFeeCurrency, _withdrawalFeeAmount, _transactionFeeCurrency, _transactionFeeAmount, _hashLock, _ethereumAddress) {
        this._rsquaredAccount = _rsquaredAccount;
        this._value = _value;
        this._withdrawalFeeCurrency = _withdrawalFeeCurrency;
        this._withdrawalFeeAmount = _withdrawalFeeAmount;
        this._transactionFeeCurrency = _transactionFeeCurrency;
        this._transactionFeeAmount = _transactionFeeAmount;
        this._hashLock = _hashLock;
        this._ethereumAddress = _ethereumAddress;
    }
    get rsquaredAccount() {
        return this._rsquaredAccount;
    }
    get value() {
        return this._value;
    }
    get withdrawalFeeCurrency() {
        return this._withdrawalFeeCurrency;
    }
    get withdrawalFeeAmount() {
        return this._withdrawalFeeAmount;
    }
    get transactionFeeCurrency() {
        return this._transactionFeeCurrency;
    }
    get transactionFeeAmount() {
        return this._transactionFeeAmount;
    }
    get hashLock() {
        return this._hashLock;
    }
    get ethereumAddress() {
        return this._ethereumAddress;
    }
}
exports.default = SubmitWithdrawRequest;
//# sourceMappingURL=SubmitWithdrawRequest.js.map