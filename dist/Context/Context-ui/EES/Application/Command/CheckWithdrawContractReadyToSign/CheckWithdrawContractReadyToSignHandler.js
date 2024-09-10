"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors = __importStar(require("./Errors"));
const Repository_1 = __importDefault(require("../../../Infrastructure/EES/Repository"));
const IndexedDBWithdrawSessionRepository_1 = __importDefault(require("../../../Infrastructure/WithdrawSessionRepository/IndexedDBWithdrawSessionRepository"));
const WithdrawContract_1 = __importDefault(require("../../../Domain/ExternalBlockchain/WithdrawContract"));
class CheckWithdrawContractReadyToSignHandler {
    constructor(sessionRepository, eesRepository) {
        this.sessionRepository = sessionRepository;
        this.eesRepository = eesRepository;
    }
    async execute(command) {
        const session = await this.sessionRepository.load(command.sessionId);
        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }
        try {
            const externalContractId = await this.eesRepository.getWithdrawExternalContractId(command.sessionId);
            session.readyToSignInExternalBlockchain(WithdrawContract_1.default.create(externalContractId));
            await this.sessionRepository.save(session);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static create() {
        const sessionRepository = new IndexedDBWithdrawSessionRepository_1.default();
        const eesRepository = new Repository_1.default();
        return new CheckWithdrawContractReadyToSignHandler(sessionRepository, eesRepository);
    }
}
exports.default = CheckWithdrawContractReadyToSignHandler;
//# sourceMappingURL=CheckWithdrawContractReadyToSignHandler.js.map