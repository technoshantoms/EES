"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessIncomingContractCreation {
    constructor(_txHash, _contractId) {
        this._txHash = _txHash;
        this._contractId = _contractId;
    }
    get blockchain() {
        return 'Ethereum';
    }
    get txHash() {
        return this._txHash;
    }
    get contractId() {
        return this._contractId;
    }
}
exports.default = ProcessIncomingContractCreation;
//# sourceMappingURL=ProcessIncomingContractCreation.js.map