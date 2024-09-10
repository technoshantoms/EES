"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepositContract {
    constructor(_txHash) {
        this._txHash = _txHash;
        this._withdrawn = false;
        this._refunded = false;
    }
    static create(txHash) {
        return new DepositContract(txHash);
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = DepositContract;
//# sourceMappingURL=DepositContract.js.map