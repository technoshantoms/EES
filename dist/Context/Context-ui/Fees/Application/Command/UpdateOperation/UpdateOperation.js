"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateOperation {
    constructor(_operation, _feeCode, _value) {
        this._operation = _operation;
        this._feeCode = _feeCode;
        this._value = _value;
    }
    get operation() {
        return this._operation;
    }
    get feeCode() {
        return this._feeCode;
    }
    get value() {
        return this._value;
    }
}
exports.default = UpdateOperation;
//# sourceMappingURL=UpdateOperation.js.map