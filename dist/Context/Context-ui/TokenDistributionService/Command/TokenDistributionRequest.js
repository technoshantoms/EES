"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenDistributionRequest {
    constructor(_rsquaredAccount, _ethAccount, _phrase) {
        this._rsquaredAccount = _rsquaredAccount;
        this._ethAccount = _ethAccount;
        this._phrase = _phrase;
    }
    get rsquaredAccount() {
        return this._rsquaredAccount;
    }
    get ethAccount() {
        return this._ethAccount;
    }
    get phrase() {
        return this._phrase;
    }
}
exports.default = TokenDistributionRequest;
//# sourceMappingURL=TokenDistributionRequest.js.map