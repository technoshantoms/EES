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
const Errors = __importStar(require("./Errors"));
class AddTransactionManuallyHandler {
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
        const transactionReceipt = await this.web3Repository.getTransactionReceipt(command.txHash);
        if (transactionReceipt === null) {
            throw new Errors.TransactionNotFound(command.sessionId);
        }
        const log = transactionReceipt["logs"][0];
        const contractId = log["topics"][1];
        const contract = await this.web3Repository.getContract(contractId, settings.depositContractAddress);
        const hashLock = contract.hashlock;
        console.log(session.hashLock, contract, hashLock);
        console.log(this.ensureHasPrefix(session.hashLock), this.ensureHasPrefix(hashLock));
        if (this.ensureHasPrefix(session.hashLock) !==
            this.ensureHasPrefix(hashLock)) {
            throw new Errors.InvalidHashLock(command.txHash);
        }
        const externalContract = DepositContract_1.default.create(command.txHash);
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
exports.default = AddTransactionManuallyHandler;
//# sourceMappingURL=AddTransactionManuallyHandler.js.map