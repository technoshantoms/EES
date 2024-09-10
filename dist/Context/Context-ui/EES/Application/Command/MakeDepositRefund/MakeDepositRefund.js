"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakeDepositRefund {
    constructor(_sessionId, _contractAddress) {
        this._sessionId = _sessionId;
        this._contractAddress = _contractAddress;
    }
    get sessionId() {
        return this._sessionId;
    }
    get contractAddress() {
        return this._contractAddress;
    }
}
exports.default = MakeDepositRefund;
//# sourceMappingURL=MakeDepositRefund.js.map