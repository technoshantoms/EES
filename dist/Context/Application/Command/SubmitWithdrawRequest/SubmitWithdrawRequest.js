"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmitWithdrawRequest {
    constructor(_nativeAccount, _amountToPayInRQETH, _addressOfUserInEthereum, _withdrawalFeeAmount, _withdrawalFeeCurrency) {
        this._nativeAccount = _nativeAccount;
        this._amountToPayInRQETH = _amountToPayInRQETH;
        this._addressOfUserInEthereum = _addressOfUserInEthereum;
        this._withdrawalFeeAmount = _withdrawalFeeAmount;
        this._withdrawalFeeCurrency = _withdrawalFeeCurrency;
    }
    get nativeAccount() {
        return this._nativeAccount;
    }
    get amountToPayInRQETH() {
        return this._amountToPayInRQETH;
    }
    get addressOfUserInEthereum() {
        return this._addressOfUserInEthereum;
    }
    get withdrawalFeeAmount() {
        return this._withdrawalFeeAmount;
    }
    get withdrawalFeeCurrency() {
        return this._withdrawalFeeCurrency;
    }
}
exports.default = SubmitWithdrawRequest;
//# sourceMappingURL=SubmitWithdrawRequest.js.map