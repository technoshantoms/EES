"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakeDepositRefundResponse {
    constructor(_success, _txHash, _errorMessage = "") {
        this._success = _success;
        this._txHash = _txHash;
        this._errorMessage = _errorMessage;
    }
    get success() {
        return this._success;
    }
    get txHash() {
        return this._txHash;
    }
    get errorMessage() {
        return this._errorMessage;
    }
}
exports.default = MakeDepositRefundResponse;
//# sourceMappingURL=MakeDepositRefundResponse.js.map