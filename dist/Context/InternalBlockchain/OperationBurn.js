"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationBurn {
    constructor(_account, _txHash) {
        this._account = _account;
        this._txHash = _txHash;
    }
    static create(account, txHash) {
        return new OperationBurn(account, txHash);
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = OperationBurn;
//# sourceMappingURL=OperationBurn.js.map