"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Create {
    constructor(_parameters, _expirationTime, _reviewPeriod = null) {
        this._parameters = _parameters;
        this._expirationTime = _expirationTime;
        this._reviewPeriod = _reviewPeriod;
    }
    get parameters() {
        return this._parameters;
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