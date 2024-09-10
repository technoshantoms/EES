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
const Deposit_1 = require("../../../../../Context/Domain/Deposit");
const ConfirmDepositInternalContractCreatedHandler_1 = __importDefault(require("../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreatedHandler"));
const ConfirmDepositInternalContractCreated_1 = __importDefault(require("../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreated"));
const Deposit_2 = require("../../../../Helpers/Deposit");
const DepositRequest_1 = require("../../../../Helpers/DepositRequest");
const ExternalContract_1 = require("../../../../Helpers/ExternalContract");
describe("ConfirmDepositInternalContractCreatedHandler", () => {
    let depositRequestRepository;
    let depositRepository;
    let internalBlockchainRepository;
    let handler;
    const txHash = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
    const internalContractId = "1.16.1";
    beforeEach(async () => {
        depositRequestRepository = new DepositRequestRepository_1.default(DataSource_1.default);
        depositRepository = new DepositRepository_1.default(DataSource_1.default);
        const internalBlockchain = await InternalBlockchain_1.default.init({
            repository: "stub",
        });
        internalBlockchainRepository = internalBlockchain.repository;
        handler = new ConfirmDepositInternalContractCreatedHandler_1.default(depositRepository);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should change deposit status", async () => {
                const depositRequest = (0, DepositRequest_1.createDepositRequest)();
                await depositRequestRepository.create(depositRequest);
                const deposit = (0, Deposit_2.createDeposit)({
                    depositRequest,
                    externalContract: (0, ExternalContract_1.createExternalContract)({ txHash }),
                });
                deposit.submittedToInternalBlockchain("1000000");
                await depositRepository.create(deposit);
                const command = new ConfirmDepositInternalContractCreated_1.default(txHash, internalContractId);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.idString);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.internalContract).not.null;
                const internalContract = updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.internalContract;
                (0, chai_1.expect)(internalContract.internalId).equals(internalContractId);
            });
        });
    });
});
//# sourceMappingURL=ConfirmDepositInternalContractCreatedHandler.js.map