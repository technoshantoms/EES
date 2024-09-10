"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
const Repository_1 = __importDefault(require("../../../Infrastructure/EES/Repository"));
class GetSessionsHandler {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async execute(query) {
        const sessions = await this.sessionRepository.all(query.internalAccount);
        const eesRepository = new Repository_1.default();
        const ids = sessions.map(session => session.id);
        if (ids.length > 0) {
            (await eesRepository.getDepositsStatuses(ids)).forEach(({ sessionId, status }) => {
                const session = sessions.find(session => session.id === sessionId);
                if (session) {
                    session.setStatus(status);
                    this.sessionRepository.save(session);
                }
            });
        }
        return Result_1.Success.create(sessions);
    }
}
exports.default = GetSessionsHandler;
//# sourceMappingURL=GetSessionsHandler.js.map