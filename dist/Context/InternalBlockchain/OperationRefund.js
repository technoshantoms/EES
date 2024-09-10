"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationRefund {
    constructor(_account, _htlcContractId, _txHash) {
        this._account = _account;
        this._htlcContractId = _htlcContractId;
        this._txHash = _txHash;
    }
    static create(account, htlcContractId, txHash) {
        return new OperationRefund(account, htlcContractId, txHash);
    }
    get htlcContractId() {
        return this._htlcContractId;
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = OperationRefund;
//# sourceMappingURL=OperationRefund.js.map