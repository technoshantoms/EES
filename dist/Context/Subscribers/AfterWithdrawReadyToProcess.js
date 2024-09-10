"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = __importDefault(require("../Core/Domain/Events/DomainEvents"));
const RabbitMQ_1 = __importDefault(require("../Queue/RabbitMQ"));
const WithdrawReadyToProcessEvent_1 = __importDefault(require("../Domain/Event/WithdrawReadyToProcessEvent"));
const QueueInterface_1 = require("../Queue/QueueInterface");
class AfterWithdrawReadyToProcess {
    constructor() {
        this.sender = new RabbitMQ_1.default();
        this.sender.initProduce().then(() => {
            this.setupSubscriptions();
        });
    }
    setupSubscriptions() {
        DomainEvents_1.default.register(this.onWithdrawReadyToProcessEvent.bind(this), WithdrawReadyToProcessEvent_1.default.eventName());
    }
    async onWithdrawReadyToProcessEvent(event) {
        await this.sender.publish(QueueInterface_1.WITHDRAW_READY_TO_PROCESS, {
            withdraw_id: event.withdrawId,
        });
    }
}
exports.default = AfterWithdrawReadyToProcess;
//# sourceMappingURL=AfterWithdrawReadyToProcess.js.map