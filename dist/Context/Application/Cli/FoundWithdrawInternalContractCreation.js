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
exports.FoundWithdrawInternalContractCreation = void 0;
const nest_commander_1 = require("nest-commander");
const Handler_1 = __importDefault(require("../../Infrastructure/Errors/Handler"));
const common_1 = require("@nestjs/common");
const CheckInternalWithdrawalOperation_1 = __importDefault(require("../Command/InternalBlockchain/CheckInternalWithdrawalOperation/CheckInternalWithdrawalOperation"));
const CheckInternalWithdrawalOperationHandler_1 = __importDefault(require("../Command/InternalBlockchain/CheckInternalWithdrawalOperation/CheckInternalWithdrawalOperationHandler"));
const AfterWithdrawReadyToProcess_1 = __importDefault(require("../../Subscribers/AfterWithdrawReadyToProcess"));
const config_1 = __importDefault(require("../../config"));
let FoundWithdrawInternalContractCreation = class FoundWithdrawInternalContractCreation extends nest_commander_1.CommandRunner {
    constructor(checkInternalWithdrawalOperationHandler, withdrawRepository) {
        super();
        this.checkInternalWithdrawalOperationHandler = checkInternalWithdrawalOperationHandler;
        this.withdrawRepository = withdrawRepository;
    }
    async run(passedParam, options) {
        new AfterWithdrawReadyToProcess_1.default();
        await this.cycleProcess(options.interval);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process() {
        const withdraws = await this.withdrawRepository.getAllForCheck();
        const errorHandler = new Handler_1.default("FoundWithdrawInternalContractCreation");
        if (withdraws.length === 0) {
            return;
        }
        console.log(`FoundWithdrawInternalContractCreation: Found ${withdraws.length} transactions to processed.`);
        for (const withdraw of withdraws) {
            const query = new CheckInternalWithdrawalOperation_1.default(withdraw);
            try {
                await this.checkInternalWithdrawalOperationHandler.execute(query);
                console.log(`FoundWithdrawInternalContractCreation: Withdraw ${withdraw.idString} processed.`);
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
], FoundWithdrawInternalContractCreation.prototype, "parseInterval", null);
FoundWithdrawInternalContractCreation = __decorate([
    (0, nest_commander_1.Command)({
        name: "found-withdraw-internal-contract-creation",
        description: "Found Withdraw Internal Contract Creation",
    }),
    __param(1, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __metadata("design:paramtypes", [CheckInternalWithdrawalOperationHandler_1.default, Object])
], FoundWithdrawInternalContractCreation);
exports.FoundWithdrawInternalContractCreation = FoundWithdrawInternalContractCreation;
//# sourceMappingURL=FoundWithdrawInternalContractCreation.js.map