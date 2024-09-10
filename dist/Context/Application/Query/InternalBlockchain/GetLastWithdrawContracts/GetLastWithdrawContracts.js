"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetLastWithdrawContracts {
    constructor(_lastOperation, _operationType) {
        this._lastOperation = _lastOperation;
        this._operationType = _operationType;
    }
    get lastOperation() {
        return this._lastOperation;
    }
    get operationType() {
        return this._operationType;
    }
}
exports.default = GetLastWithdrawContracts;
//# sourceMappingURL=GetLastWithdrawContracts.js.map