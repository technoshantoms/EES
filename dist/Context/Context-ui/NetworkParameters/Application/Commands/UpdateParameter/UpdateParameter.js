"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateParameter {
    constructor(_parameters, _key, _newValue) {
        this._parameters = _parameters;
        this._key = _key;
        this._newValue = _newValue;
    }
    get parameters() {
        return this._parameters;
    }
    get key() {
        return this._key;
    }
    get newValue() {
        return this._newValue;
    }
}
exports.default = UpdateParameter;
//# sourceMappingURL=UpdateParameter.js.map