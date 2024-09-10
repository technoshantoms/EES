"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = __importDefault(require("../Core/Domain/Events/DomainEvents"));
const IncomingContractProcessedEvent_1 = __importDefault(require("../Domain/Event/IncomingContractProcessedEvent"));
const RabbitMQ_1 = __importDefault(require("../Queue/RabbitMQ"));
class AfterIncomingContractProcessed {
    constructor() {
        this.sender = new RabbitMQ_1.default();
        this.sender.initProduce().then(() => {
            this.setupSubscriptions();
        });
    }
    setupSubscriptions() {
        DomainEvents_1.default.register(this.onDepositConfirmedEvent.bind(this), IncomingContractProcessedEvent_1.default.eventName());
    }
    async onDepositConfirmedEvent(event) {
        await this.sender.publish("create_in_internal_blockchain", {
            deposit_id: event.depositId,
        });
    }
}
exports.default = AfterIncomingContractProcessed;
//# sourceMappingURL=AfterIncomingContractProcessed.js.map