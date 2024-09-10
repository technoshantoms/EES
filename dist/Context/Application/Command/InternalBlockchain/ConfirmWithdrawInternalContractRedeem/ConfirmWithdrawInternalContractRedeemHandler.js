"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ConfirmWithdrawInternalContractRedeemHandler = class ConfirmWithdrawInternalContractRedeemHandler {
    constructor(withdrawRepository) {
        this.withdrawRepository = withdrawRepository;
    }
    async execute(command) {
        var _a, _b;
        this.validateTransaction(command.transaction);
        const withdraw = await this.withdrawRepository.getByInternalContractId((_a = command.transaction.htlcId) !== null && _a !== void 0 ? _a : "");
        if (!withdraw) {
            throw new Error(`Withdraw transaction with internal contract ${command.transaction.htlcId} not found.`);
        }
        withdraw.setInternalRedeemBlockNumber((_b = command.transaction.blockNumber) !== null && _b !== void 0 ? _b : 0);
        await this.withdrawRepository.save(withdraw);
    }
    validateTransaction(transaction) {
        if (!transaction.htlcId) {
            throw new Error(`Undefined HTLC ID in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.blockNumber) {
            throw new Error(`Undefined blockNumber in transaction ${transaction.transactionId}.`);
        }
    }
};
ConfirmWithdrawInternalContractRedeemHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __metadata("design:paramtypes", [Object])
], ConfirmWithdrawInternalContractRedeemHandler);
exports.default = ConfirmWithdrawInternalContractRedeemHandler;
//# sourceMappingURL=ConfirmWithdrawInternalContractRedeemHandler.js.map