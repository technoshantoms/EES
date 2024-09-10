"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contract {
    constructor(_contractId, _sender, _receiver, _value, _hashLock, _timeLock, _withdrawn, _refunded, _preimage) {
        this._contractId = _contractId;
        this._sender = _sender;
        this._receiver = _receiver;
        this._value = _value;
        this._hashLock = _hashLock;
        this._timeLock = _timeLock;
        this._withdrawn = _withdrawn;
        this._refunded = _refunded;
        this._preimage = _preimage;
    }
    get contractId() {
        return this._contractId;
    }
    get sender() {
        return this._sender;
    }
    get receiver() {
        return this._receiver;
    }
    get value() {
        return this._value;
    }
    get hashLock() {
        return this._hashLock;
    }
    get timeLock() {
        return this._timeLock;
    }
    get withdrawn() {
        return this._withdrawn;
    }
    get refunded() {
        return this._refunded;
    }
    get preimage() {
        return this._preimage;
    }
}
exports.default = Contract;
//# sourceMappingURL=Contract.js.map