"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class NetworkParameter {
    constructor(_name) {
        this._name = _name;
        this._value = null;
        this._newValue = null;
        this._description = null;
        this._type = null;
        this._modified = false;
        this._link = null;
        this._linkValue = null;
        this._children = (0, immutable_1.Map)();
    }
    get name() {
        return this._name;
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    get newValue() {
        return this._newValue;
    }
    set newValue(value) {
        if (value === this.value) {
            this._newValue = null;
            this._modified = false;
            return;
        }
        this._newValue = value;
        this._modified = true;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get link() {
        return this._link;
    }
    set link(value) {
        this._link = value;
    }
    get linkValue() {
        return this._linkValue;
    }
    set linkValue(value) {
        this._linkValue = value;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    isNormal() {
        return this.value !== null && !this.isGroup();
    }
    isLink() {
        return this.link !== null;
    }
    isGroup() {
        return this._children.size > 0;
    }
    isModified() {
        return this._modified;
    }
}
exports.default = NetworkParameter;
//# sourceMappingURL=NetworkParameter.js.map