"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fee {
    constructor(_code, _value) {
        this._code = _code;
        this._value = _value;
        this._newValue = null;
    }
    get code() {
        return this._code;
    }
    get value() {
        return this._value;
    }
    get newValue() {
        return this._newValue;
    }
    get updated() {
        return null != this.newValue && this.value != this.newValue;
    }
    update(newValue) {
        this._newValue = newValue;
    }
    static create(code, value) {
        return new Fee(code, value);
    }
}
exports.default = Fee;
//# sourceMappingURL=Fee.js.map