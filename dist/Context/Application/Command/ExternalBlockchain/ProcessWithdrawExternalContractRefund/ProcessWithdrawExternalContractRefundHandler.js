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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessWithdrawExternalContractRefundHandler = void 0;
const common_1 = require("@nestjs/common");
const Setting_1 = __importDefault(require("../../../../Setting/Setting"));
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
let ProcessWithdrawExternalContractRefundHandler = class ProcessWithdrawExternalContractRefundHandler {
    constructor(withdrawRepository, externalBlockchain, setting, notifier) {
        this.withdrawRepository = withdrawRepository;
        this.externalBlockchain = externalBlockchain;
        this.setting = setting;
        this.notifier = notifier;
    }
    async execute(command) {
        var _a, _b, _c, _d, _e;
        const externalContract = await this.externalBlockchain.loadWithdrawContract((_b = (_a = command.withdraw.externalContract) === null || _a === void 0 ? void 0 : _a.txHash) !== null && _b !== void 0 ? _b : "", (_d = (_c = command.withdraw.externalContract) === null || _c === void 0 ? void 0 : _c.idString) !== null && _d !== void 0 ? _d : "");
        if (externalContract === null || externalContract === void 0 ? void 0 : externalContract.withdrawn) {
            return;
        }
        const txHash = await this.externalBlockchain.refund((_e = externalContract === null || externalContract === void 0 ? void 0 : externalContract.contractId) !== null && _e !== void 0 ? _e : "");
        command.withdraw.refund(txHash);
        await this.withdrawRepository.save(command.withdraw);
    }
};
ProcessWithdrawExternalContractRefundHandler = __decorate([
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __param(3, (0, common_1.Inject)("NotifierInterface")),
    __metadata("design:paramtypes", [Object, ExternalBlockchain_1.default,
        Setting_1.default, Object])
], ProcessWithdrawExternalContractRefundHandler);
exports.ProcessWithdrawExternalContractRefundHandler = ProcessWithdrawExternalContractRefundHandler;
//# sourceMappingURL=ProcessWithdrawExternalContractRefundHandler.js.map