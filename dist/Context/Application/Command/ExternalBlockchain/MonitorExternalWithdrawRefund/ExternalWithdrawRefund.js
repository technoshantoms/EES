"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExternalWithdrawRefund {
    constructor(_txHash, _contractId) {
        this._txHash = _txHash;
        this._contractId = _contractId;
    }
    get blockchain() {
        return "Ethereum";
    }
    get txHash() {
        return this._txHash;
    }
    get contractId() {
        return this._contractId;
    }
}
exports.default = ExternalWithdrawRefund;
//# sourceMappingURL=ExternalWithdrawRefund.js.map