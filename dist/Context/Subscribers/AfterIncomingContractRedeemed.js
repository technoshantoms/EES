"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = __importDefault(require("../Core/Domain/Events/DomainEvents"));
const IncomingContractRedeemedEvent_1 = __importDefault(require("../Domain/Event/IncomingContractRedeemedEvent"));
const RabbitMQ_1 = __importDefault(require("../Queue/RabbitMQ"));
class AfterIncomingContractRedeemed {
    constructor() {
        this.sender = new RabbitMQ_1.default();
        this.sender.initProduce().then(() => {
            this.setupSubscriptions();
        });
    }
    setupSubscriptions() {
        DomainEvents_1.default.register(this.onDepositRedeemedEvent.bind(this), IncomingContractRedeemedEvent_1.default.eventName());
    }
    async onDepositRedeemedEvent(event) {
        await this.sender.publish("deposit_redeemed_in_internal_blockchain", {
            deposit_id: event.depositId,
        });
    }
}
exports.default = AfterIncomingContractRedeemed;
//# sourceMappingURL=AfterIncomingContractRedeemed.js.map