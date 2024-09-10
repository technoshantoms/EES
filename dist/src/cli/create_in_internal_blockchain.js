"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const DepositRepository_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DepositRepository"));
const DataSource_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const InternalBlockchain_1 = __importDefault(require("../../Context/InternalBlockchain/InternalBlockchain"));
const EtherToWrappedEtherConverter_1 = __importDefault(require("../../Context/Infrastructure/EtherToWrappedEtherConverter"));
const CreateContractInInternalBlockchain_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchain"));
const CreateContractInInternalBlockchainHandler_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchainHandler"));
const ExternalBlockchain_1 = __importDefault(require("../../Context/ExternalBlockchain/ExternalBlockchain"));
const AssetNormalizer_1 = __importDefault(require("../../Context/Infrastructure/AssetNormalizer"));
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .option("id", {
    alias: "i",
    describe: "Deposit id",
    type: "string",
})
    .demandOption(["id"])
    .help()
    .parseSync();
const depositId = argv.id;
const main = async () => {
    const depositRepository = new DepositRepository_1.default(DataSource_1.default);
    const internalBlockchain = await InternalBlockchain_1.default.init({
        repository: "native",
    });
    const externalBlockchain = new ExternalBlockchain_1.default("ethereum");
    const converter = new EtherToWrappedEtherConverter_1.default();
    const handler = new CreateContractInInternalBlockchainHandler_1.default(depositRepository, internalBlockchain, externalBlockchain, converter, new AssetNormalizer_1.default());
    const command = new CreateContractInInternalBlockchain_1.default(depositId);
    await handler.execute(command);
    internalBlockchain.disconnect();
};
main().then(() => {
    console.log(`Create in internal blockchain: Internal HTLC for deposit ${depositId} was created.`);
});
//# sourceMappingURL=create_in_internal_blockchain.js.map