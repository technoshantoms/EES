"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmitDepositRequest {
    constructor(_nativeAccount, _hashLock) {
        this._nativeAccount = _nativeAccount;
        this._hashLock = _hashLock;
    }
    get nativeAccount() {
        return this._nativeAccount;
    }
    get hashLock() {
        return this._hashLock;
    }
}
exports.default = SubmitDepositRequest;
//# sourceMappingURL=SubmitDepositRequest.js.map