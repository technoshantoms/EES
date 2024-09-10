"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmitDepositRequest {
    constructor(_rsquaredAccount, _value, _hashLock, _timeLock) {
        this._rsquaredAccount = _rsquaredAccount;
        this._value = _value;
        this._hashLock = _hashLock;
        this._timeLock = _timeLock;
    }
    get rsquaredAccount() {
        return this._rsquaredAccount;
    }
    get value() {
        return this._value;
    }
    get hashLock() {
        return this._hashLock;
    }
    get timeLock() {
        return this._timeLock;
    }
}
exports.default = SubmitDepositRequest;
//# sourceMappingURL=SubmitDepositRequest.js.map