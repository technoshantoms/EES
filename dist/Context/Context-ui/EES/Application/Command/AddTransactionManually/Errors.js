"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidHashLock = exports.TransactionNotFound = exports.SessionAlreadyPaid = exports.SessionNotFoundError = void 0;
const AppError_1 = require("../../../../Core/Logic/AppError");
class SessionNotFoundError extends AppError_1.UseCaseError {
    constructor(id) {
        super(`The session with id ${id} was not found.`);
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
class SessionAlreadyPaid extends AppError_1.UseCaseError {
    constructor(id) {
        super(`The session with id ${id} cannot be paid.`);
    }
}
exports.SessionAlreadyPaid = SessionAlreadyPaid;
class TransactionNotFound extends AppError_1.UseCaseError {
    constructor(txHash) {
        super(`The transaction with hash ${txHash} was not found.`);
    }
}
exports.TransactionNotFound = TransactionNotFound;
class InvalidHashLock extends AppError_1.UseCaseError {
    constructor(txHash) {
        super(`The transaction with hash ${txHash} has different hash lock.`);
    }
}
exports.InvalidHashLock = InvalidHashLock;
//# sourceMappingURL=Errors.js.map