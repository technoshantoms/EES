"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const DataSource_1 = __importDefault(require("../../../../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const DepositRequestRepository_1 = __importDefault(require("../../../../../Context/Infrastructure/TypeORM/DepositRequestRepository"));
const DepositRepository_1 = __importDefault(require("../../../../../Context/Infrastructure/TypeORM/DepositRepository"));
const InternalBlockchain_1 = __importDefault(require("../../../../../Context/InternalBlockchain/InternalBlockchain"));
const EtherToWrappedEtherConverter_1 = __importDefault(require("../../../../../Context/Infrastructure/EtherToWrappedEtherConverter"));
const Deposit_1 = require("../../../../../Context/Domain/Deposit");
const CreateContractInInternalBlockchain_1 = __importDefault(require("../../../../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchain"));
const CreateContractInInternalBlockchainHandler_1 = __importDefault(require("../../../../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchainHandler"));
const Deposit_2 = require("../../../../Helpers/Deposit");
const DepositRequest_1 = require("../../../../Helpers/DepositRequest");
const AssetNormalizer_1 = __importDefault(require("../../../../../Context/Infrastructure/AssetNormalizer"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
describe("CreateContractInInternalBlockchainHandler", () => {
    let depositRequestRepository;
    let depositRepository;
    let internalBlockchainRepository;
    let handler;
    beforeEach(async () => {
        depositRequestRepository = new DepositRequestRepository_1.default(DataSource_1.default);
        depositRepository = new DepositRepository_1.default(DataSource_1.default);
        const internalBlockchain = await InternalBlockchain_1.default.init({
            repository: "stub",
        });
        const externalBlockchain = new ExternalBlockchain_1.default("stub");
        internalBlockchainRepository = internalBlockchain.repository;
        const converter = new EtherToWrappedEtherConverter_1.default();
        handler = new CreateContractInInternalBlockchainHandler_1.default(depositRepository, internalBlockchain, externalBlockchain, converter, new AssetNormalizer_1.default());
    });
    describe("execute", () => {
        describe("success", () => {
            it("should change deposit status", async () => {
                const depositRequest = (0, DepositRequest_1.createDepositRequest)();
                await depositRequestRepository.create(depositRequest);
                const deposit = (0, Deposit_2.createDeposit)({ depositRequest });
                await depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.idString);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_1.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN);
            });
        });
    });
});
//# sourceMappingURL=CreateContractInInternalBlockchainHandler.js.map