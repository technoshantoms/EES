"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfirmDepositExternalContractRedeemed {
    constructor(_txHash) {
        this._txHash = _txHash;
    }
    get blockchain() {
        return 'Ethereum';
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = ConfirmDepositExternalContractRedeemed;
//# sourceMappingURL=ConfirmDepositExternalContractRedeemed.js.map