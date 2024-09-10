"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameter {
    constructor(_name, _value) {
        this._name = _name;
        this._value = _value;
        this._networkValue = null;
        this._changed = false;
        this._new = false;
    }
    get name() {
        return this._name;
    }
    get value() {
        return this._value;
    }
    get changed() {
        return this._changed;
    }
    get new() {
        return this._new;
    }
    set networkValue(newValue) {
        this._networkValue = newValue;
        if (this.value !== this._networkValue) {
            this._changed = true;
        }
    }
    get networkValue() {
        return this._networkValue;
    }
    markAsNew() {
        this._new = true;
    }
    static create(name, value) {
        return new Parameter(name, value);
    }
}
exports.default = Parameter;
//# sourceMappingURL=Parameter.js.map