"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Create {
    constructor(_operations, _expirationTime, _reviewPeriod = null) {
        this._operations = _operations;
        this._expirationTime = _expirationTime;
        this._reviewPeriod = _reviewPeriod;
    }
    get operations() {
        return this._operations;
    }
    get expirationTime() {
        return this._expirationTime;
    }
    get reviewPeriod() {
        return this._reviewPeriod;
    }
}
exports.default = Create;
//# sourceMappingURL=CreateProposal.js.map