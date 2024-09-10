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
const IndexedDBWithdrawSessionRepository_1 = __importDefault(require("../../../Infrastructure/WithdrawSessionRepository/IndexedDBWithdrawSessionRepository"));
const RedeemWithdrawRequest_1 = __importDefault(require("../../../Domain/ExternalBlockchain/RedeemWithdrawRequest"));
const AppError_1 = require("../../../../Core/Logic/AppError");
const Errors = __importStar(require("./Errors"));
const Repository_1 = __importDefault(require("../../../Infrastructure/EES/Repository"));
const Web3Repository_1 = __importDefault(require("../../../Infrastructure/ExternalBlockchain/Web3Repository"));
class RedeemWithdrawHandler {
    constructor(web3Repository, eesRepository, sessionRepository) {
        this.web3Repository = web3Repository;
        this.eesRepository = eesRepository;
        this.sessionRepository = sessionRepository;
    }
    async execute(command) {
        const session = await this.sessionRepository.load(command.sessionId);
        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }
        if (!session.isReadyToSignInExternalBlockchain()) {
            throw new Errors.InvalidSessionStatusError(command.sessionId);
        }
        const settings = await this.eesRepository.loadEESSettings();
        const request = new RedeemWithdrawRequest_1.default(command.contractId, command.preimage, settings.receiverAddress, settings.withdrawContractAddress, command.receiverAddress);
        let redeemWithdrawResponse;
        try {
            redeemWithdrawResponse = await this.web3Repository.redeemWithdraw(request);
        }
        catch (e) {
            console.log("Error in Handler", e);
            throw new Errors.ExternalBlockchainError(e.message);
        }
        if (!redeemWithdrawResponse.success) {
            throw new AppError_1.BlockchainConnectionError();
        }
        session.redeem(redeemWithdrawResponse.txHash);
        await this.sessionRepository.save(session);
        return true;
    }
    static create() {
        const sessionRepository = new IndexedDBWithdrawSessionRepository_1.default();
        const eesRepository = new Repository_1.default();
        const web3Repository = new Web3Repository_1.default();
        return new RedeemWithdrawHandler(web3Repository, eesRepository, sessionRepository);
    }
}
exports.default = RedeemWithdrawHandler;
//# sourceMappingURL=RedeemWithdrawHandler.js.map