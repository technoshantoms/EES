"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundUnexpectedError = exports.SessionAlreadyRefundedError = exports.SessionNotFoundError = void 0;
const AppError_1 = require("../../../../Core/Logic/AppError");
class SessionNotFoundError extends AppError_1.UseCaseError {
    constructor(id) {
        super(`The session with id ${id} was not found.`);
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
class SessionAlreadyRefundedError extends AppError_1.UseCaseError {
    constructor(id) {
        super(`The session with id ${id} cannot be refunded.`);
    }
}
exports.SessionAlreadyRefundedError = SessionAlreadyRefundedError;
class RefundUnexpectedError extends AppError_1.UseCaseError {
    constructor(id, error) {
        super(`The session with id ${id} got unexpected error.`);
    }
}
exports.RefundUnexpectedError = RefundUnexpectedError;
//# sourceMappingURL=Errors.js.map