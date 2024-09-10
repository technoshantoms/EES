"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakeDeposit {
    constructor(_blockchainType, _senderAddress, _sessionId) {
        this._blockchainType = _blockchainType;
        this._senderAddress = _senderAddress;
        this._sessionId = _sessionId;
    }
    get blockchainType() {
        return this._blockchainType;
    }
    get senderAddress() {
        return this._senderAddress;
    }
    get sessionId() {
        return this._sessionId;
    }
}
exports.default = MakeDeposit;
//# sourceMappingURL=MakeDeposit.js.map