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
const DepositRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/DepositRepository"));
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
const Deposit_1 = require("../../../../../Helpers/Deposit");
const ConfirmDepositInternalContractCreatedHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreatedHandler"));
const ConfirmDepositInternalContractCreated_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreated"));
const Errors = __importStar(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/Errors"));
const DomainErrors = __importStar(require("../../../../../../Context/Domain/Errors"));
describe("ConfirmDepositInternalContractCreatedHandler", () => {
    let depositRepository;
    let handler;
    beforeEach(async () => {
        depositRepository = new DepositRepository_1.default();
        handler = new ConfirmDepositInternalContractCreatedHandler_1.default(depositRepository);
    });
    describe("execute", () => {
        const txHash = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
        describe("success", () => {
            it("should change status to STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN", async () => {
                const deposit = (0, Deposit_1.createDeposit)({
                    externalContract: (0, ExternalContract_1.createExternalContract)({ txHash }),
                });
                deposit.submittedToInternalBlockchain("1000000");
                depositRepository.create(deposit);
                const internalId = "1.16.1";
                const command = new ConfirmDepositInternalContractCreated_1.default(txHash, internalId);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.id.toValue());
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(10);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.internalContract).not.null;
                const internalContract = deposit.internalContract;
                (0, chai_1.expect)(internalContract.internalId).equals(internalId);
            });
        });
        describe("error", () => {
            it("should throw error if deposit with external id does not exist", async () => {
                const command = new ConfirmDepositInternalContractCreated_1.default("invalid_external_id", "1.16.1");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositNotFound);
            });
            it("should throw error if deposit status is invalid", async () => {
                const deposit = (0, Deposit_1.createDeposit)({
                    externalContract: (0, ExternalContract_1.createExternalContract)({ txHash }),
                });
                depositRepository.create(deposit);
                const command = new ConfirmDepositInternalContractCreated_1.default(txHash, "1.16.1");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(DomainErrors.ConfirmDepositInternalContractCreatedStatusError);
            });
        });
    });
});
//# sourceMappingURL=ConfirmDepositInternalContractCreatedHandler.js.map