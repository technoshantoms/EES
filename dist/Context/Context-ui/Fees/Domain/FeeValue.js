"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeeValue {
    constructor(_value, _newValue) {
        this._value = _value;
        this._newValue = _newValue;
    }
    get value() {
        return this._value;
    }
    get newValue() {
        return this._newValue;
    }
    updated() {
        return null != this._newValue && this._newValue != this._value;
    }
    static create(value, newValue) {
        return new FeeValue(value, newValue);
    }
}
exports.default = FeeValue;
//# sourceMappingURL=FeeValue.js.map