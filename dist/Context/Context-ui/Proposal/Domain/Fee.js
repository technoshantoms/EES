"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fee {
    constructor(_code, _value) {
        this._code = _code;
        this._value = _value;
        this._networkValue = null;
        this._changed = false;
    }
    get code() {
        return this._code;
    }
    get value() {
        return this._value;
    }
    get networkValue() {
        return this._networkValue;
    }
    setNetworkValue(networkValue) {
        this._networkValue = networkValue;
        if (networkValue !== this._value) {
            this._changed = true;
        }
    }
    get changed() {
        return this._changed;
    }
    static create(code, value) {
        return new Fee(code, value);
    }
}
exports.default = Fee;
//# sourceMappingURL=Fee.js.map