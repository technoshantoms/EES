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
const RedeemExecutedInExternalBlockchainValidator_1 = __importDefault(require("../../../../Domain/Validation/RedeemExecutedInExternalBlockchainValidator"));
const Errors = __importStar(require("./Errors"));
const Helpers_1 = require("../../../../Infrastructure/Helpers");
class RedeemDepositExternalContractHandler {
    constructor(depositRepository, externalBlockchain) {
        this.depositRepository = depositRepository;
        this.externalBlockchain = externalBlockchain;
    }
    async execute(command) {
        const deposit = await this.depositRepository.getById(command.depositId);
        if (null === deposit) {
            throw new Errors.DepositNotExists(command.depositId);
        }
        new RedeemExecutedInExternalBlockchainValidator_1.default(deposit).validate();
        const secret = Buffer.from(deposit.secret).toString('hex');
        const txHash = await this.externalBlockchain.redeem(deposit._externalContract.idString, (0, Helpers_1.ensureHasPrefix)(secret));
        await deposit.redeemExecutedInExternalBlockchain(txHash);
        await this.depositRepository.save(deposit);
    }
}
exports.default = RedeemDepositExternalContractHandler;
//# sourceMappingURL=RedeemDepositExternalContractHandler.js.map