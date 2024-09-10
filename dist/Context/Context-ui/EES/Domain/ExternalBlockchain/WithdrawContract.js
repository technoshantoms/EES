"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WithdrawContract {
    constructor(_id) {
        this._id = _id;
        this.txHash = null;
    }
    static create(id) {
        return new WithdrawContract(id);
    }
    get id() {
        return this._id;
    }
}
exports.default = WithdrawContract;
//# sourceMappingURL=WithdrawContract.js.map