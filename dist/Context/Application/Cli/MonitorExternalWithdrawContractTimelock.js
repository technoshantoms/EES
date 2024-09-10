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
exports.MonitorExternalWithdrawContractTimelock = void 0;
const nest_commander_1 = require("nest-commander");
const common_1 = require("@nestjs/common");
const Handler_1 = __importDefault(require("../../Infrastructure/Errors/Handler"));
const ProcessWithdrawExternalContractRefundHandler_1 = require("../Command/ExternalBlockchain/ProcessWithdrawExternalContractRefund/ProcessWithdrawExternalContractRefundHandler");
const ProcessWithdrawExternalContractRefund_1 = require("../Command/ExternalBlockchain/ProcessWithdrawExternalContractRefund/ProcessWithdrawExternalContractRefund");
const config_1 = __importDefault(require("../../config"));
let MonitorExternalWithdrawContractTimelock = class MonitorExternalWithdrawContractTimelock extends nest_commander_1.CommandRunner {
    constructor(processWithdrawExternalContractRefundHandler, withdrawRepository) {
        super();
        this.processWithdrawExternalContractRefundHandler = processWithdrawExternalContractRefundHandler;
        this.withdrawRepository = withdrawRepository;
    }
    async run(passedParam, options) {
        await this.cycleProcess(options.interval);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process() {
        const withdraws = await this.withdrawRepository.getAllReadyToRefund();
        const errorHandler = new Handler_1.default("MonitorExternalWithdrawContractTimelock");
        if (withdraws.length === 0) {
            return;
        }
        console.log(`MonitorExternalWithdrawContractTimelock: Found withdraw transactions ${withdraws.length} for refund.`);
        for (const withdraw of withdraws) {
            const query = new ProcessWithdrawExternalContractRefund_1.ProcessWithdrawExternalContractRefund(withdraw);
            try {
                await this.processWithdrawExternalContractRefundHandler.execute(query);
                console.log(`MonitorExternalWithdrawContractTimelock: Withdraw ${withdraw.idString} refunded.`);
            }
            catch (e) {
                errorHandler.handle(e);
            }
        }
    }
    cycleProcess(interval) {
        this.process().then(() => {
            setTimeout(() => {
                this.cycleProcess(interval);
            }, interval * 1000);
        });
    }
};
__decorate([
    (0, nest_commander_1.Option)({
        flags: "-i, --interval [number]",
        description: "Launch interval (seconds)",
        defaultValue: config_1.default.worker.period,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Number)
], MonitorExternalWithdrawContractTimelock.prototype, "parseInterval", null);
MonitorExternalWithdrawContractTimelock = __decorate([
    (0, nest_commander_1.Command)({
        name: "monitor-external-withdraw-contract-timelock",
        description: "Monitor External Withdraw Contract Timelock",
    }),
    __param(1, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __metadata("design:paramtypes", [ProcessWithdrawExternalContractRefundHandler_1.ProcessWithdrawExternalContractRefundHandler, Object])
], MonitorExternalWithdrawContractTimelock);
exports.MonitorExternalWithdrawContractTimelock = MonitorExternalWithdrawContractTimelock;
//# sourceMappingURL=MonitorExternalWithdrawContractTimelock.js.map