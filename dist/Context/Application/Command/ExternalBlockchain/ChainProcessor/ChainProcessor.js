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
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
const Setting_1 = __importDefault(require("../../../../Setting/Setting"));
const common_1 = require("@nestjs/common");
const IncomingContractsCreationsProcessingLink_1 = __importDefault(require("../ProcessIncomingContractCreation/IncomingContractsCreationsProcessingLink"));
const MonitorExternalDepositRedeemsLink_1 = __importDefault(require("../MonitorExternalDepositRedeem/MonitorExternalDepositRedeemsLink"));
const WithdrawContractsCreationsProcessingLink_1 = __importDefault(require("../ProcessWithdrawContractCreation/WithdrawContractsCreationsProcessingLink"));
const MonitorExternalWithdrawRedeemsLink_1 = __importDefault(require("../MonitorExternalWithdrawRedeem/MonitorExternalWithdrawRedeemsLink"));
const MonitorExternalDepositRefundsLink_1 = __importDefault(require("../MonitorExternalDepositRefund/MonitorExternalDepositRefundsLink"));
const MonitorExternalWithdrawRefundsLink_1 = __importDefault(require("../MonitorExternalWithdrawRefund/MonitorExternalWithdrawRefundsLink"));
let ChainProcessor = class ChainProcessor {
    constructor(externalBlockchain, setting, incomingContractsCreationsProcessingLink, monitorExternalDepositRedeemLink, withdrawContractsCreationsProcessingLink, monitorExternalWithdrawRedeemsLink, monitorExternalDepositRefundLink, monitorExternalWithdrawRefundLink) {
        this.externalBlockchain = externalBlockchain;
        this.setting = setting;
        this.incomingContractsCreationsProcessingLink = incomingContractsCreationsProcessingLink;
        this.monitorExternalDepositRedeemLink = monitorExternalDepositRedeemLink;
        this.withdrawContractsCreationsProcessingLink = withdrawContractsCreationsProcessingLink;
        this.monitorExternalWithdrawRedeemsLink = monitorExternalWithdrawRedeemsLink;
        this.monitorExternalDepositRefundLink = monitorExternalDepositRefundLink;
        this.monitorExternalWithdrawRefundLink = monitorExternalWithdrawRefundLink;
        this.handlers = [];
        this.handlers.push(incomingContractsCreationsProcessingLink);
        this.handlers.push(monitorExternalDepositRedeemLink);
        this.handlers.push(withdrawContractsCreationsProcessingLink);
        this.handlers.push(monitorExternalWithdrawRedeemsLink);
        this.handlers.push(monitorExternalDepositRefundLink);
        this.handlers.push(monitorExternalWithdrawRefundLink);
    }
    async execute(range) {
        return new Promise((resolve, reject) => {
            Promise.all(this.handlers.map((handler) => {
                try {
                    return handler.execute(range);
                }
                catch (e) {
                    if (e instanceof Error) {
                        console.log("Error in ", typeof handler, ": ", e.message);
                    }
                }
                return new Promise((resolve) => {
                    resolve();
                });
            }))
                .then(() => {
                resolve();
            })
                .catch(reject);
        });
    }
};
ChainProcessor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ExternalBlockchain_1.default,
        Setting_1.default,
        IncomingContractsCreationsProcessingLink_1.default,
        MonitorExternalDepositRedeemsLink_1.default,
        WithdrawContractsCreationsProcessingLink_1.default,
        MonitorExternalWithdrawRedeemsLink_1.default,
        MonitorExternalDepositRefundsLink_1.default,
        MonitorExternalWithdrawRefundsLink_1.default])
], ChainProcessor);
exports.default = ChainProcessor;
//# sourceMappingURL=ChainProcessor.js.map