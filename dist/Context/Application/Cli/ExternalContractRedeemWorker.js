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
exports.ExternalContractRedeemWorker = void 0;
const nest_commander_1 = require("nest-commander");
const ConfirmDepositExternalContractRedeemed_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmDepositExternalContractRedeemed/ConfirmDepositExternalContractRedeemed"));
const ConfirmDepositExternalContractRedeemedHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmDepositExternalContractRedeemed/ConfirmDepositExternalContractRedeemedHandler"));
const QueueInterface_1 = require("../../Queue/QueueInterface");
const common_1 = require("@nestjs/common");
let ExternalContractRedeemWorker = class ExternalContractRedeemWorker extends nest_commander_1.CommandRunner {
    constructor(queue, handler) {
        super();
        this.queue = queue;
        this.handler = handler;
    }
    async run() {
        this.queue.consume(QueueInterface_1.EXTERNAL_DEPOSIT_CONTRACT_REDEEM, async (message, ack, nack) => {
            const command = new ConfirmDepositExternalContractRedeemed_1.default(message.txHash);
            try {
                await this.handler.execute(command);
                ack();
                console.log(`Redeem of HTLC contract with txHash ${message.txHash} confirmed in an external blockchain.`);
            }
            catch (e) {
                nack();
                const errorMessage = e.message;
                console.log(`Error occurred while confirming redeem of HTLC contract with txHash ${message.txHash}: ${errorMessage}.`);
            }
        });
    }
};
ExternalContractRedeemWorker = __decorate([
    (0, nest_commander_1.Command)({
        name: "worker-external-contract-redeem",
        description: "Consume RabbitMQ message to confirm deposit external contract redeemed",
    }),
    __param(0, (0, common_1.Inject)("QueueInterface")),
    __metadata("design:paramtypes", [Object, ConfirmDepositExternalContractRedeemedHandler_1.default])
], ExternalContractRedeemWorker);
exports.ExternalContractRedeemWorker = ExternalContractRedeemWorker;
//# sourceMappingURL=ExternalContractRedeemWorker.js.map