"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const DepositRepository_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DepositRepository"));
const RabbitMQ_1 = __importDefault(require("../../Context/Queue/RabbitMQ"));
const ExternalBlockchain_1 = __importDefault(require("../../Context/ExternalBlockchain/ExternalBlockchain"));
const RedeemDepositExternalContract_1 = __importDefault(require("../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContract"));
const RedeemDepositExternalContractHandler_1 = __importDefault(require("../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContractHandler"));
async function main() {
    const depositRepository = new DepositRepository_1.default(DataSource_1.default);
    const externalBlockchain = new ExternalBlockchain_1.default("ethereum");
    const handler = new RedeemDepositExternalContractHandler_1.default(depositRepository, externalBlockchain);
    const messenger = new RabbitMQ_1.default();
    messenger.consume("deposit_redeemed_in_internal_blockchain", async (message, ack, nack) => {
        const command = new RedeemDepositExternalContract_1.default(message.deposit_id);
        try {
            await handler.execute(command);
            ack();
            console.log(`WorkerRedeemInInternalBlockchain: HTLC contract redeemed in an external blockchain: ${message.deposit_id}`);
        }
        catch (e) {
            console.log("WorkerRedeemInInternalBlockchain: ", e);
            nack();
        }
    });
}
main();
//# sourceMappingURL=worker_redeem_in_external_blockchain.js.map