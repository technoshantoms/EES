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
const common_1 = require("@nestjs/common");
const GetDepositLastRefundsHandler_1 = __importDefault(require("../../../Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastRefundsHandler"));
const ExternalDepositRefundHandler_1 = __importDefault(require("./ExternalDepositRefundHandler"));
const ExternalDepositRefund_1 = __importDefault(require("./ExternalDepositRefund"));
let MonitorExternalDepositRefundsLink = class MonitorExternalDepositRefundsLink {
    constructor(getLastRefundsHandler, externalContractRefundHandler) {
        this.getLastRefundsHandler = getLastRefundsHandler;
        this.externalContractRefundHandler = externalContractRefundHandler;
    }
    async execute(command) {
        const lastContracts = await this.getLastRefundsHandler.execute(command);
        for (const event of lastContracts.events) {
            console.log(`MonitorExternalDepositRefundsLink: Process deposit refund transaction ${event.transactionHash}`);
            try {
                const command = new ExternalDepositRefund_1.default(event.transactionHash, event.returnValues.contractId);
                await this.externalContractRefundHandler.execute(command);
                console.log(`MonitorExternalDepositRefundsLink: Refund deposit transaction ${event.transactionHash} successfully queued`);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.log("Error in ", typeof this, ":", e.message);
                }
            }
        }
    }
};
MonitorExternalDepositRefundsLink = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [GetDepositLastRefundsHandler_1.default,
        ExternalDepositRefundHandler_1.default])
], MonitorExternalDepositRefundsLink);
exports.default = MonitorExternalDepositRefundsLink;
//# sourceMappingURL=MonitorExternalDepositRefundsLink.js.map