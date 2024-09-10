"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNotFoundError = void 0;
const AppError_1 = require("../../../../Core/Logic/AppError");
class SessionNotFoundError extends AppError_1.UseCaseError {
    constructor(id) {
        super(`The session with id ${id} was not found.`);
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
//# sourceMappingURL=Errors.js.map