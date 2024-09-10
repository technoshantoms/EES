"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = __importDefault(require("../Core/Domain/AggregateRoot"));
class DepositRequest extends AggregateRoot_1.default {
    constructor(_nativeAccount, _hashLock) {
        super();
        this._nativeAccount = _nativeAccount;
        this._hashLock = _hashLock;
        this._status = 1;
    }
    get nativeAccount() {
        return this._nativeAccount;
    }
    get hashLock() {
        return this._hashLock;
    }
    get status() {
        return this._status;
    }
    static create(nativeAccount, hashLock) {
        const depositRequest = new DepositRequest(nativeAccount, hashLock);
        return depositRequest;
    }
}
exports.default = DepositRequest;
//# sourceMappingURL=DepositRequest.js.map