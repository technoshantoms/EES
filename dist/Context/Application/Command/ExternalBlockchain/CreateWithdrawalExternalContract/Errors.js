"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.WithdrawNotExists = exports.PersistentError = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class PersistentError extends UseCaseError_1.UseCaseError {
}
exports.PersistentError = PersistentError;
class WithdrawNotExists extends PersistentError {
    constructor(id) {
        super(`The withdraw with id "${id}" not exists.`);
    }
}
exports.WithdrawNotExists = WithdrawNotExists;
class ValidationError extends PersistentError {
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=Errors.js.map