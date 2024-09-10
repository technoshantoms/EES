"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTLC {
    constructor(_fromAddress, _amount, _hash, _timeout) {
        this._fromAddress = _fromAddress;
        this._amount = _amount;
        this._hash = _hash;
        this._timeout = _timeout;
    }
    get fromAddress() {
        return this._fromAddress;
    }
    get amount() {
        return this._amount;
    }
    get hash() {
        return this._hash;
    }
    get timeout() {
        return this._timeout;
    }
}
exports.default = HTLC;
//# sourceMappingURL=HTLC.js.map