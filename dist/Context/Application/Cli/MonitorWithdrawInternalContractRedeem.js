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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorWithdrawInternalContractRedeem = void 0;
const nest_commander_1 = require("nest-commander");
const Handler_1 = __importDefault(require("../../Infrastructure/Errors/Handler"));
const GetLastWithdrawContracts_1 = __importDefault(require("../Query/InternalBlockchain/GetLastWithdrawContracts/GetLastWithdrawContracts"));
const GetLastWithdrawContractsHandler_1 = __importDefault(require("../Query/InternalBlockchain/GetLastWithdrawContracts/GetLastWithdrawContractsHandler"));
const ConfirmWithdrawInternalContractRedeemHandler_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawInternalContractRedeem/ConfirmWithdrawInternalContractRedeemHandler"));
const ConfirmWithdrawInternalContractRedeem_1 = __importDefault(require("../Command/InternalBlockchain/ConfirmWithdrawInternalContractRedeem/ConfirmWithdrawInternalContractRedeem"));
const WithdrawTransactionsCollection_1 = require("../../InternalBlockchain/WithdrawTransactionsCollection");
const config_1 = __importDefault(require("../../config"));
const NATIVE_LAST_PROCESSED_ACCOUNT_HISTORY_WITHDRAW_REDEEM_OPERATION_NAME = "native_last_processed_account_history_withdraw_redeem_operation";
let MonitorWithdrawInternalContractRedeem = class MonitorWithdrawInternalContractRedeem extends nest_commander_1.CommandRunner {
    constructor(confirmWithdrawInternalContractRedeemHandler, getLastWithdrawContractsHandler) {
        super();
        this.confirmWithdrawInternalContractRedeemHandler = confirmWithdrawInternalContractRedeemHandler;
        this.getLastWithdrawContractsHandler = getLastWithdrawContractsHandler;
    }
    async run(passedParam, options) {
        await this.cycleProcess(options.interval);
    }
    parseInterval(val) {
        return Number(val);
    }
    async process() {
        const queryGetLastWithdrawContracts = new GetLastWithdrawContracts_1.default(NATIVE_LAST_PROCESSED_ACCOUNT_HISTORY_WITHDRAW_REDEEM_OPERATION_NAME, WithdrawTransactionsCollection_1.OperationType.Redeem);
        const withdrawTransactions = await this.getLastWithdrawContractsHandler.execute(queryGetLastWithdrawContracts);
        const errorHandler = new Handler_1.default("MonitorWithdrawInternalContractRedeem");
        if (withdrawTransactions.transactions.length === 0) {
            return;
        }
        console.log(`MonitorWithdrawInternalContractRedeem: Found ${withdrawTransactions.transactions.length} transactions to processed.`);
        for (const transaction of withdrawTransactions.transactions) {
            const query = new ConfirmWithdrawInternalContractRedeem_1.default(transaction);
            try {
                await this.confirmWithdrawInternalContractRedeemHandler.execute(query);
                console.log(`MonitorWithdrawInternalContractRedeem: Withdraw for transaction ${transaction.transactionId} redeemed.`);
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
], MonitorWithdrawInternalContractRedeem.prototype, "parseInterval", null);
MonitorWithdrawInternalContractRedeem = __decorate([
    (0, nest_commander_1.Command)({
        name: "monitor-withdraw-internal-contract-redeem",
        description: "Monitor Withdraw Internal Contract Redeem",
    }),
    __metadata("design:paramtypes", [ConfirmWithdrawInternalContractRedeemHandler_1.default,
        GetLastWithdrawContractsHandler_1.default])
], MonitorWithdrawInternalContractRedeem);
exports.MonitorWithdrawInternalContractRedeem = MonitorWithdrawInternalContractRedeem;
//# sourceMappingURL=MonitorWithdrawInternalContractRedeem.js.map