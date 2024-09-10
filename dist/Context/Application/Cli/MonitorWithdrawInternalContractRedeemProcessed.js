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
exports.MonitorWithdrawInternalContractRedeemProcessed = void 0;
const nest_commander_1 = require("nest-commander");
const Handler_1 = __importDefault(require("../../Infrastructure/Errors/Handler"));
const common_1 = require("@nestjs/common");
const ConfirmWithdrawProcessedHandler_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessedHandler"));
const ConfirmWithdrawProcessed_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessed"));
const config_1 = __importDefault(require("../../config"));
let MonitorWithdrawInternalContractRedeemProcessed = class MonitorWithdrawInternalContractRedeemProcessed extends nest_commander_1.CommandRunner {
    constructor(confirmWithdrawProcessedHandler, withdrawRepository) {
        super();
        this.confirmWithdrawProcessedHandler = confirmWithdrawProcessedHandler;
        this.withdrawRepository = withdrawRepository;
    }
    async run(passedParam, options) {
        await this.cycleProcess(options.interval);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process() {
        const withdraws = await this.withdrawRepository.getAllRedeemed();
        const errorHandler = new Handler_1.default("MonitorWithdrawInternalContractRedeemProcessed");
        if (withdraws.length === 0) {
            return;
        }
        console.log(`MonitorWithdrawInternalContractRedeemProcessed: Found redeemed withdraw transactions ${withdraws.length}.`);
        for (const withdraw of withdraws) {
            const query = new ConfirmWithdrawProcessed_1.default(withdraw);
            try {
                await this.confirmWithdrawProcessedHandler.execute(query);
                console.log(`MonitorWithdrawInternalContractRedeemProcessed: Withdraw ${withdraw.idString} processed.`);
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
], MonitorWithdrawInternalContractRedeemProcessed.prototype, "parseInterval", null);
MonitorWithdrawInternalContractRedeemProcessed = __decorate([
    (0, nest_commander_1.Command)({
        name: "monitor-withdraw-internal-contract-redeem-processed",
        description: "Monitor Withdraw Internal Contract Redeem Processed",
    }),
    __param(1, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __metadata("design:paramtypes", [ConfirmWithdrawProcessedHandler_1.default, Object])
], MonitorWithdrawInternalContractRedeemProcessed);
exports.MonitorWithdrawInternalContractRedeemProcessed = MonitorWithdrawInternalContractRedeemProcessed;
//# sourceMappingURL=MonitorWithdrawInternalContractRedeemProcessed.js.map