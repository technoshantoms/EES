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
const Setting_1 = __importDefault(require("../../../../Setting/Setting"));
const InternalBlockchain_1 = __importDefault(require("../../../../InternalBlockchain/InternalBlockchain"));
const Response_1 = __importDefault(require("./Response"));
const common_1 = require("@nestjs/common");
const WithdrawTransactionsCollection_1 = require("../../../../InternalBlockchain/WithdrawTransactionsCollection");
const rsquared_js_1 = require("@r-squared/rsquared-js");
let GetLastWithdrawContractsHandler = class GetLastWithdrawContractsHandler {
    constructor(internalBlockchain, setting) {
        this.internalBlockchain = internalBlockchain;
        this.setting = setting;
    }
    async execute(query) {
        const lastProcessedAccountHistoryOperation = await this.setting.load(query.lastOperation, "1." + rsquared_js_1.ChainTypes.object_type.operation_history + ".0");
        const operations = await this.internalBlockchain.getAccountHistory(lastProcessedAccountHistoryOperation);
        const eesAccount = await this.internalBlockchain.getEesAccount();
        const transactions = new WithdrawTransactionsCollection_1.WithdrawTransactionsCollection(eesAccount.get("id"), query.operationType);
        for (const operation of operations) {
            transactions.add(operation);
        }
        const lastOperation = operations.shift();
        if (lastOperation) {
            await this.setting.save(query.lastOperation, lastOperation.id);
        }
        return new Response_1.default(transactions.transactions);
    }
};
GetLastWithdrawContractsHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("InternalBlockchain")),
    __metadata("design:paramtypes", [InternalBlockchain_1.default,
        Setting_1.default])
], GetLastWithdrawContractsHandler);
exports.default = GetLastWithdrawContractsHandler;
//# sourceMappingURL=GetLastWithdrawContractsHandler.js.map