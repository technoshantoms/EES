"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InternalContract_1 = __importDefault(require("../../../../Domain/InternalContract"));
const Errors_1 = require("./Errors");
const Helpers_1 = require("../../../../Infrastructure/Helpers");
const Deposit_1 = require("../../../../Domain/Deposit");
class ConfirmDepositInternalContractCreatedHandler {
    constructor(depositRepository) {
        this.depositRepository = depositRepository;
    }
    async execute(command) {
        const txHash = (0, Helpers_1.ensureHasPrefix)(command.txHash);
        let deposit = await this.depositRepository.getByTxHash(txHash);
        if (null === deposit) {
            throw new Errors_1.DepositNotFound(txHash);
        }
        if (deposit.status < Deposit_1.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN) {
            deposit = await this.depositRepository.getByTxHash(txHash);
            if (null === deposit) {
                throw new Errors_1.DepositNotFound(txHash);
            }
        }
        const internalContract = new InternalContract_1.default(command.internalId);
        deposit.createdInInternalBlockchain(internalContract);
        await this.depositRepository.save(deposit);
    }
}
exports.default = ConfirmDepositInternalContractCreatedHandler;
//# sourceMappingURL=ConfirmDepositInternalContractCreatedHandler.js.map