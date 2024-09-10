"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationRedeem {
    constructor(_account, _htlcContractId, _secret, _transactionId) {
        this._account = _account;
        this._htlcContractId = _htlcContractId;
        this._secret = _secret;
        this._transactionId = _transactionId;
    }
    static create(account, htlcContractId, secret, transactionId) {
        return new OperationRedeem(account, htlcContractId, secret, transactionId);
    }
    get htlcContractId() {
        return this._htlcContractId;
    }
    get secret() {
        return this._secret;
    }
}
exports.default = OperationRedeem;
//# sourceMappingURL=OperationRedeem.js.map