"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WithdrawSession_1 = __importDefault(require("../../../Domain/Withdraw/WithdrawSession"));
class SubmitWithdrawRequestHandler {
    constructor(eesRepository, sessionRepository) {
        this.eesRepository = eesRepository;
        this.sessionRepository = sessionRepository;
    }
    async execute(command) {
        const withdrawRequestId = await this.eesRepository.createWithdrawRequest(command.rsquaredAccount, command.value, command.ethereumAddress, command.withdrawalFeeAmount, command.withdrawalFeeCurrency);
        const session = WithdrawSession_1.default.create(withdrawRequestId, command.rsquaredAccount, command.value, command.hashLock, command.withdrawalFeeCurrency, command.withdrawalFeeAmount, command.transactionFeeCurrency, command.transactionFeeAmount, command.ethereumAddress);
        await this.sessionRepository.save(session);
        return session.id;
    }
}
exports.default = SubmitWithdrawRequestHandler;
//# sourceMappingURL=SubmitWithdrawRequestHandler.js.map