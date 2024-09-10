"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
const Errors_1 = require("./Errors");
class GetWithdrawSessionHandler {
    constructor(_sessionRepository) {
        this._sessionRepository = _sessionRepository;
    }
    async execute(query) {
        const session = await this._sessionRepository.load(query.sessionId);
        if (session === null) {
            return Result_1.Failure.create(new Errors_1.SessionNotFoundError(query.sessionId));
        }
        return Result_1.Success.create(session);
    }
}
exports.default = GetWithdrawSessionHandler;
//# sourceMappingURL=GetWithdrawSessionHandler.js.map