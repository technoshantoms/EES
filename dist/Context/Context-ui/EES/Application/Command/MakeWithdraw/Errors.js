"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAlreadyPaid = exports.SessionNotFoundError = void 0;
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
//# sourceMappingURL=Errors.js.map