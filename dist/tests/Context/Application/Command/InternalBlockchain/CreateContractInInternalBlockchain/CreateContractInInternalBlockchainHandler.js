"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const dayjs_1 = __importDefault(require("dayjs"));
const DepositRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/DepositRepository"));
const InternalBlockchain_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/InternalBlockchain"));
const EtherToWrappedEtherConverter_1 = __importDefault(require("../../../../../../Context/Infrastructure/EtherToWrappedEtherConverter"));
const Deposit_1 = require("../../../../../../Context/Domain/Deposit");
const CreateContractInInternalBlockchain_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchain"));
const CreateContractInInternalBlockchainHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/CreateContractInInternalBlockchainHandler"));
const Errors = __importStar(require("../../../../../../Context/Application/Command/InternalBlockchain/CreateContractInInternalBlockchain/Errors"));
const DomainErrors = __importStar(require("../../../../../../Context/Domain/Errors"));
const Deposit_2 = require("../../../../../Helpers/Deposit");
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
const AssetNormalizer_1 = __importDefault(require("../../../../../../Context/Infrastructure/AssetNormalizer"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
describe("CreateContractInInternalBlockchainHandler", () => {
    let depositRepository;
    let internalBlockchainRepository;
    let handler;
    beforeEach(async () => {
        depositRepository = new DepositRepository_1.default();
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
            it("should be completed without errors", async () => {
                const deposit = (0, Deposit_2.createDeposit)();
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
            });
            it("should change deposit status", async () => {
                const deposit = (0, Deposit_2.createDeposit)();
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.idString);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_1.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN);
            });
            it("should create one contract in internal blockchain", async () => {
                const deposit = (0, Deposit_2.createDeposit)();
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await handler.execute(command);
                const internalContracts = internalBlockchainRepository.contracts;
                (0, chai_1.expect)(internalContracts).length(1);
            });
            it("should create contract with correct parameters", async () => {
                const deposit = (0, Deposit_2.createDeposit)();
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await handler.execute(command);
                const internalContract = internalBlockchainRepository.contracts[0];
                (0, chai_1.expect)(internalContract.externalId).equals(deposit._externalContract.txHash);
                (0, chai_1.expect)(internalContract.accountToName).equals(deposit._depositRequest.nativeAccount.value);
                (0, chai_1.expect)(internalContract.hashLock).equals(deposit._externalContract.hashLock.value.slice(2));
            });
            it("should create contract with correct timelock", async () => {
                const externalContract = (0, ExternalContract_1.createExternalContract)({
                    timeLock: (0, dayjs_1.default)().add(10, "days").unix(),
                });
                const deposit = (0, Deposit_2.createDeposit)({ externalContract });
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await handler.execute(command);
                const internalContract = internalBlockchainRepository.contracts[0];
                (0, chai_1.expect)(internalContract.timeLock).equals(600);
            });
        });
        describe("error", () => {
            it("should throw error if deposit is not exist", async () => {
                const command = new CreateContractInInternalBlockchain_1.default("invalid_deposit_id");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositNotFound);
            });
            it("should throw error if deposit has invalid state", async () => {
                const deposit = (0, Deposit_2.createDeposit)();
                deposit.submittedToInternalBlockchain("1000000");
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(DomainErrors.CreateContractInInternalBlockchainStatusError);
            });
            it("should throw error if external deposit timelock is too small", async () => {
                const externalContract = (0, ExternalContract_1.createExternalContract)({
                    timeLock: (0, dayjs_1.default)().unix(),
                });
                const deposit = (0, Deposit_2.createDeposit)({ externalContract });
                depositRepository.create(deposit);
                const command = new CreateContractInInternalBlockchain_1.default(deposit.idString);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(DomainErrors.CreateContractInInternalBlockchainTimeLockError);
            });
        });
    });
});
//# sourceMappingURL=CreateContractInInternalBlockchainHandler.js.map