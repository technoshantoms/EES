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
const RSquaredReposistory_1 = __importDefault(require("../../../Infrastructure/InternalBlockchain/Repository/RSquaredReposistory"));
const IndexedDBDepositSessionRepository_1 = __importDefault(require("../../../Infrastructure/SessionRepository/IndexedDBDepositSessionRepository"));
const Errors = __importStar(require("./Errors"));
const Repository_1 = __importDefault(require("../../../Infrastructure/EES/Repository"));
class CheckDepositContractCreatedHandler {
    constructor(sessionRepository, internalBlockchainRepository, eesRepository) {
        this.sessionRepository = sessionRepository;
        this.internalBlockchainRepository = internalBlockchainRepository;
        this.eesRepository = eesRepository;
    }
    async execute(command) {
        var _a;
        const session = await this.sessionRepository.load(command.sessionId);
        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }
        const internalContracts = await this.internalBlockchainRepository.loadContractsByAccount(session.internalAccount);
        let result = false;
        try {
            result = await this.eesRepository.checkDepositSubmittedToInternalBlockchain(command.sessionId);
        }
        catch (e) {
            return false;
        }
        if (!result) {
            return false;
        }
        for (const internalContract of internalContracts) {
            if (internalContract.message ===
                this.remove0x((_a = session.externalContract) === null || _a === void 0 ? void 0 : _a.txHash)) {
                session.createdInternalBlockchain(internalContract);
                await this.sessionRepository.save(session);
                return true;
            }
        }
        return false;
    }
    remove0x(txHash) {
        if ("0x" === txHash.substring(0, 2)) {
            return txHash.substring(2);
        }
        return txHash;
    }
    static create() {
        const sessionRepository = new IndexedDBDepositSessionRepository_1.default();
        const internalRepository = RSquaredReposistory_1.default.create();
        const eesRepository = new Repository_1.default();
        return new CheckDepositContractCreatedHandler(sessionRepository, internalRepository, eesRepository);
    }
}
exports.default = CheckDepositContractCreatedHandler;
//# sourceMappingURL=CheckDepositContractCreatedHandler.js.map