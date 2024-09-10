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
exports.WorkerWithdrawExternalContractRedeemed = void 0;
const nest_commander_1 = require("nest-commander");
const Errors_1 = require("../Command/ExternalBlockchain/CreateWithdrawalExternalContract/Errors");
const ConfirmWithdrawExternalContractRedeemed_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemed"));
const ConfirmWithdrawExternalContractRedeemedHandler_1 = __importDefault(require("../Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemedHandler"));
const QueueInterface_1 = require("../../Queue/QueueInterface");
const common_1 = require("@nestjs/common");
let WorkerWithdrawExternalContractRedeemed = class WorkerWithdrawExternalContractRedeemed extends nest_commander_1.CommandRunner {
    constructor(messenger, handler) {
        super();
        this.messenger = messenger;
        this.handler = handler;
    }
    async run(passedParam) {
        this.messenger.consume(QueueInterface_1.EXTERNAL_WITHDRAW_CONTRACT_REDEEM, async (message, ack, nack) => {
            const command = new ConfirmWithdrawExternalContractRedeemed_1.default(message.txHash, message.contractId);
            try {
                await this.handler.execute(command);
                ack();
                console.log(`WorkerWithdrawExternalContractRedeemed: HTLC contract ${message.contractId} redeemed in an external blockchain`);
            }
            catch (e) {
                const errorMessage = e.message;
                console.log("WorkerWithdrawExternalContractRedeemed: ", errorMessage);
                if (e instanceof Errors_1.PersistentError) {
                    ack();
                }
                else {
                    nack();
                }
            }
        });
    }
};
WorkerWithdrawExternalContractRedeemed = __decorate([
    (0, nest_commander_1.Command)({
        name: "worker-withdraw-external-contract-redeemed",
        description: "Worker to Confirm Withdraw External Contract Redeemed",
    }),
    __param(0, (0, common_1.Inject)("QueueInterface")),
    __metadata("design:paramtypes", [Object, ConfirmWithdrawExternalContractRedeemedHandler_1.default])
], WorkerWithdrawExternalContractRedeemed);
exports.WorkerWithdrawExternalContractRedeemed = WorkerWithdrawExternalContractRedeemed;
//# sourceMappingURL=WorkerWithdrawExternalContractRedeemed.js.map