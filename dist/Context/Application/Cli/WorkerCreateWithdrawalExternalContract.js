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
exports.WorkerCreateWithdrawalExternalContract = void 0;
const nest_commander_1 = require("nest-commander");
const CreateWithdrawalExternalContract_1 = __importDefault(require("../Command/ExternalBlockchain/CreateWithdrawalExternalContract/CreateWithdrawalExternalContract"));
const CreateWithdrawalExternalContractHandler_1 = __importDefault(require("../Command/ExternalBlockchain/CreateWithdrawalExternalContract/CreateWithdrawalExternalContractHandler"));
const Errors_1 = require("../Command/ExternalBlockchain/CreateWithdrawalExternalContract/Errors");
const QueueInterface_1 = require("../../Queue/QueueInterface");
const common_1 = require("@nestjs/common");
let WorkerCreateWithdrawalExternalContract = class WorkerCreateWithdrawalExternalContract extends nest_commander_1.CommandRunner {
    constructor(messenger, handler) {
        super();
        this.messenger = messenger;
        this.handler = handler;
    }
    async run(passedParam) {
        this.messenger.consume(QueueInterface_1.WITHDRAW_READY_TO_PROCESS, async (message, ack, nack) => {
            const command = new CreateWithdrawalExternalContract_1.default(message.withdraw_id);
            try {
                await this.handler.execute(command);
                ack();
                console.log(`WorkerCreateWithdrawalExternalContract: HTLC contract created in an external blockchain: ${message.withdraw_id}`);
            }
            catch (e) {
                console.log("WorkerCreateWithdrawalExternalContract: ", e);
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
WorkerCreateWithdrawalExternalContract = __decorate([
    (0, nest_commander_1.Command)({
        name: "worker-create-withdrawal-external-contract",
        description: "Worker Create Withdrawal External Contract",
    }),
    __param(0, (0, common_1.Inject)("QueueInterface")),
    __metadata("design:paramtypes", [Object, CreateWithdrawalExternalContractHandler_1.default])
], WorkerCreateWithdrawalExternalContract);
exports.WorkerCreateWithdrawalExternalContract = WorkerCreateWithdrawalExternalContract;
//# sourceMappingURL=WorkerCreateWithdrawalExternalContract.js.map