"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const InternalBlockchain_1 = __importDefault(require("../../Context/InternalBlockchain/InternalBlockchain"));
const CreateContractInInternalBlockchain_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchain"));
const CreateContractInInternalBlockchainHandler_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchainHandler"));
const DepositRepository_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DepositRepository"));
const DataSource_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const EtherToWrappedEtherConverter_1 = __importDefault(require("../../Context/Infrastructure/EtherToWrappedEtherConverter"));
const RabbitMQ_1 = __importDefault(require("../../Context/Queue/RabbitMQ"));
const ExternalBlockchain_1 = __importDefault(require("../../Context/ExternalBlockchain/ExternalBlockchain"));
const AssetNormalizer_1 = __importDefault(require("../../Context/Infrastructure/AssetNormalizer"));
(0, yargs_1.default)(process.argv.slice(2))
    .usage("Connect to a RabbitMQ server and consume new messages. Create new contract in an internal blockchain")
    .help()
    .parseSync();
let internalBlockchain;
let messenger;
async function main() {
    const depositRepository = new DepositRepository_1.default(DataSource_1.default);
    internalBlockchain = await InternalBlockchain_1.default.init({
        repository: "native",
    });
    const externalBlockchain = new ExternalBlockchain_1.default("ethereum");
    const converter = new EtherToWrappedEtherConverter_1.default();
    const handler = new CreateContractInInternalBlockchainHandler_1.default(depositRepository, internalBlockchain, externalBlockchain, converter, new AssetNormalizer_1.default());
    messenger = new RabbitMQ_1.default();
    messenger.consume("create_in_internal_blockchain", async (message, ack, nack) => {
        const command = new CreateContractInInternalBlockchain_1.default(message.deposit_id);
        try {
            await handler.execute(command);
            ack();
            console.log(`WorkerCreateInInternalBlockchain: HTLC contract submitted in an internal blockchain: ${message.deposit_id}`);
        }
        catch (e) {
            nack();
            const errorMessage = e.message;
            console.log(`WorkerCreateInInternalBlockchain: Error occurred while HTLC contract submitted in an internal blockchain: ${message.deposit_id} ${errorMessage}`);
        }
    });
}
process.on("SIGINT", () => {
    messenger.disconnect();
    internalBlockchain.disconnect();
});
main();
//# sourceMappingURL=worker_create_in_internal_blockchain.js.map