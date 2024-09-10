"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Create {
    constructor(_transaction, _expirationTime, _reviewPeriod) {
        this._transaction = _transaction;
        this._expirationTime = _expirationTime;
        this._reviewPeriod = _reviewPeriod;
    }
    get transaction() {
        return this._transaction;
    }
    get expirationTime() {
        return this._expirationTime;
    }
    get reviewPeriod() {
        return this._reviewPeriod;
    }
}
exports.default = Create;
//# sourceMappingURL=Create.js.map