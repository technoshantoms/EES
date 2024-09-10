"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddTransactionManually {
    constructor(_sessionId, _txHash) {
        this._sessionId = _sessionId;
        this._txHash = _txHash;
    }
    get sessionId() {
        return this._sessionId;
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = AddTransactionManually;
//# sourceMappingURL=AddTransactionManually.js.map