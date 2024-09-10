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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.MonitorDepositInternalContractRefunded = void 0;
const nest_commander_1 = require("nest-commander");
const Errors = __importStar(require("../Command/InternalBlockchain/DepositInternalContractRefund/Errors"));
const common_1 = require("@nestjs/common");
const DepositInternalContractRefund_1 = __importDefault(require("../Command/InternalBlockchain/DepositInternalContractRefund/DepositInternalContractRefund"));
const DepositInternalContractRefundHandler_1 = __importDefault(require("../Command/InternalBlockchain/DepositInternalContractRefund/DepositInternalContractRefundHandler"));
const Handler_1 = __importDefault(require("../../Infrastructure/Errors/Handler"));
const config_1 = __importDefault(require("../../config"));
let MonitorDepositInternalContractRefunded = class MonitorDepositInternalContractRefunded extends nest_commander_1.CommandRunner {
    constructor(depositRepository, depositInternalContractRefundHandler) {
        super();
        this.depositRepository = depositRepository;
        this.depositInternalContractRefundHandler = depositInternalContractRefundHandler;
    }
    async run(passedParam, options) {
        await this.cycleProcess(options.interval);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process() {
        const errorHandler = new Handler_1.default("MonitorDepositInternalContractRefunded");
        try {
            const deposits = await this.depositRepository.getOverdueTimeLock();
            for (const deposit of deposits) {
                const command = new DepositInternalContractRefund_1.default(deposit.idString);
                try {
                    await this.depositInternalContractRefundHandler.execute(command);
                }
                catch (e) {
                    errorHandler.handle(e);
                }
            }
        }
        catch (e) {
            if (e instanceof Errors.DepositNotFound) {
                errorHandler.handle(e);
                return;
            }
            throw e;
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
], MonitorDepositInternalContractRefunded.prototype, "parseInterval", null);
MonitorDepositInternalContractRefunded = __decorate([
    (0, nest_commander_1.Command)({
        name: "monitor-deposit-internal-contract-refunded",
        description: "Monitor Deposit Internal Contract Refunded",
    }),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __metadata("design:paramtypes", [Object, DepositInternalContractRefundHandler_1.default])
], MonitorDepositInternalContractRefunded);
exports.MonitorDepositInternalContractRefunded = MonitorDepositInternalContractRefunded;
//# sourceMappingURL=MonitorDepositInternalContractRefunded.js.map