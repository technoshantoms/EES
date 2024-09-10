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
const DepositContract_1 = __importDefault(require("../../../Domain/ExternalBlockchain/DepositContract"));
const CreateNewContractRequest_1 = __importDefault(require("../../../Domain/ExternalBlockchain/CreateNewContractRequest"));
const Errors = __importStar(require("./Errors"));
const AppError_1 = require("../../../../Core/Logic/AppError");
class MakeDepositHandler {
    constructor(sessionRepository, eesRepository, web3Repository) {
        this.sessionRepository = sessionRepository;
        this.eesRepository = eesRepository;
        this.web3Repository = web3Repository;
    }
    async execute(command) {
        const session = await this.sessionRepository.load(command.sessionId);
        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }
        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }
        const settings = await this.eesRepository.loadEESSettings();
        const createNewExternalContractRequest = new CreateNewContractRequest_1.default(command.senderAddress, settings.depositContractAddress, settings.receiverAddress, session.value, this.ensureHasPrefix(session.hashLock), session.timeLock.unix());
        const createContractResponse = await this.web3Repository.create(createNewExternalContractRequest);
        if (!createContractResponse.success) {
            throw new AppError_1.BlockchainConnectionError();
        }
        const externalContract = DepositContract_1.default.create(createContractResponse.txHash);
        session.pay(externalContract);
        await this.sessionRepository.save(session);
        return true;
    }
    ensureHasPrefix(hashLock) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }
        return hashLock;
    }
}
exports.default = MakeDepositHandler;
//# sourceMappingURL=MakeDepositHandler.js.map