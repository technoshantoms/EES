"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Session_1 = __importDefault(require("../../../Domain/Deposit/Session"));
class SubmitDepositRequestHandler {
    constructor(eesRepository, sessionRepository) {
        this.eesRepository = eesRepository;
        this.sessionRepository = sessionRepository;
    }
    async execute(command) {
        const depositRequestId = await this.eesRepository.createDepositRequest(command.rsquaredAccount, command.hashLock);
        const session = Session_1.default.create(depositRequestId, command.rsquaredAccount, command.value, command.hashLock, command.timeLock);
        await this.sessionRepository.save(session);
        return session.id;
    }
}
exports.default = SubmitDepositRequestHandler;
//# sourceMappingURL=SubmitDepositRequestHandler.js.map