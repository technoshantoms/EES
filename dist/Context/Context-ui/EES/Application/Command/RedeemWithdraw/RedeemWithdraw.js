"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedeemWithdraw {
    constructor(_contractId, _receiverAddress, _preimage, _sessionId) {
        this._contractId = _contractId;
        this._receiverAddress = _receiverAddress;
        this._preimage = _preimage;
        this._sessionId = _sessionId;
    }
    get contractId() {
        return this._contractId;
    }
    get receiverAddress() {
        return this._receiverAddress;
    }
    get preimage() {
        return this._preimage;
    }
    get sessionId() {
        return this._sessionId;
    }
}
exports.default = RedeemWithdraw;
//# sourceMappingURL=RedeemWithdraw.js.map