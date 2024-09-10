"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionWrongStatusError = void 0;
const Core_1 = require("../../Core");
class SessionWrongStatusError extends Core_1.DomainError {
    constructor(sessionId, message) {
        super(`Session ${sessionId} can't be processed: ${message}`);
    }
}
exports.SessionWrongStatusError = SessionWrongStatusError;
//# sourceMappingURL=Errors.js.map