"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = void 0;
const Errors_1 = require("../Errors");
var STATUS;
(function (STATUS) {
    STATUS[STATUS["CREATED"] = 1] = "CREATED";
    STATUS[STATUS["SUBMITTED_TO_INTERNAL_BLOCKCHAIN"] = 5] = "SUBMITTED_TO_INTERNAL_BLOCKCHAIN";
    STATUS[STATUS["READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN"] = 10] = "READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN";
    STATUS[STATUS["REDEEMED"] = 15] = "REDEEMED";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
class WithdrawSession {
    constructor(_id, _internalAccountName, _value, _hashLock, _withdrawalFeeCurrency, _withdrawalFeeAmount, _transactionFeeCurrency, _transactionFeeAmount, _ethereumAddress) {
        this._id = _id;
        this._internalAccountName = _internalAccountName;
        this._value = _value;
        this._hashLock = _hashLock;
        this._withdrawalFeeCurrency = _withdrawalFeeCurrency;
        this._withdrawalFeeAmount = _withdrawalFeeAmount;
        this._transactionFeeCurrency = _transactionFeeCurrency;
        this._transactionFeeAmount = _transactionFeeAmount;
        this._ethereumAddress = _ethereumAddress;
        this._externalContract = null;
        this._internalContract = null;
        this._status = STATUS.CREATED;
    }
    get id() {
        return this._id;
    }
    get internalAccountName() {
        return this._internalAccountName;
    }
    get value() {
        return this._value;
    }
    get hashLock() {
        return this._hashLock;
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
    get ethereumAddress() {
        return this._ethereumAddress;
    }
    get status() {
        return this._status;
    }
    get externalContract() {
        return this._externalContract;
    }
    get internalContract() {
        return this._internalContract;
    }
    isCreated() {
        return this._status === STATUS.CREATED;
    }
    isSubmitted() {
        return this._status === STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN;
    }
    isReadyToSignInExternalBlockchain() {
        return this._status === STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN;
    }
    isRedeemed() {
        return this._status === STATUS.REDEEMED;
    }
    failedSubmittedInInternalBlockchain() {
        if (!this.isSubmitted()) {
            throw new Errors_1.SessionWrongStatusError(this._id, "Can't restore created status.");
        }
        this._status = STATUS.CREATED;
    }
    submittedInInternalBlockchain() {
        if (!this.isCreated()) {
            throw new Errors_1.SessionWrongStatusError(this._id, "Can't approve submitted.");
        }
        this._status = STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN;
    }
    readyToSignInExternalBlockchain(externalContract) {
        if (!this.isSubmitted()) {
            throw new Errors_1.SessionWrongStatusError(this._id, "Can't approve ready to sign.");
        }
        this._externalContract = externalContract;
        this._status = STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN;
    }
    redeem(txHash) {
        if (this._externalContract) {
            this._externalContract.txHash = txHash;
        }
        this._status = STATUS.REDEEMED;
    }
    static create(id, internalAccount, value, hashLock, withdrawalFeeCurrency, withdrawalFeeAmount, transactionFeeCurrency, transactionFeeAmount, ethereumAddress) {
        return new WithdrawSession(id, internalAccount, value, hashLock, withdrawalFeeCurrency, withdrawalFeeAmount, transactionFeeCurrency, transactionFeeAmount, ethereumAddress);
    }
}
exports.default = WithdrawSession;
//# sourceMappingURL=WithdrawSession.js.map