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
const InternalBlockchain_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/InternalBlockchain"));
const ConfirmDepositInternalContractRedeemed_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemed"));
const ConfirmDepositInternalContractRedeemedHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemedHandler"));
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
const Deposit_1 = require("../../../../../Helpers/Deposit");
const Errors = __importStar(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/Errors"));
const InternalContract_1 = require("../../../../../Helpers/InternalContract");
const DepositRequest_1 = require("../../../../../Helpers/DepositRequest");
const OperationRedeem_1 = require("../../../../../Helpers/InternalBlockchain/OperationRedeem");
const Deposit_2 = require("../../../../../../Context/Domain/Deposit");
describe("ConfirmDepositInternalContractRedeemedHandler", () => {
    let depositRepository;
    let handler;
    let internalBlockchain;
    let internalBlockchainRepository;
    const internalAccountName = "internal_account_name";
    const externalContractId = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
    beforeEach(async () => {
        depositRepository = new DepositRepository_1.default();
        internalBlockchain = await InternalBlockchain_1.default.init({
            repository: "stub",
        });
        internalBlockchainRepository = internalBlockchain.repository;
        handler = new ConfirmDepositInternalContractRedeemedHandler_1.default(depositRepository, internalBlockchain);
    });
    describe("execute", () => {
        describe("success", () => {
            let deposit;
            beforeEach(() => {
                deposit = (0, Deposit_1.createDeposit)({
                    depositRequest: (0, DepositRequest_1.createDepositRequest)(internalAccountName),
                    externalContract: (0, ExternalContract_1.createExternalContract)({ id: externalContractId }),
                });
                deposit.submittedToInternalBlockchain("1000000");
                deposit.createdInInternalBlockchain((0, InternalContract_1.createInternalContract)());
                depositRepository.create(deposit);
            });
            it("should not change status if redeem operation is not existed", async () => {
                const command = new ConfirmDepositInternalContractRedeemed_1.default(deposit.idString);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.id.toValue());
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_2.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN);
            });
            it("should change status and save secret if redeem operation is existed", async () => {
                var _a;
                const secret = "b85a0e9f792cb3a9bc7dc75fdb1b795e91cf91ffddacc8d7869638079b02850b";
                internalBlockchainRepository.addRedeemOperation((0, OperationRedeem_1.createOperationRedeem)({
                    internalContractId: (_a = deposit.internalContract) === null || _a === void 0 ? void 0 : _a.internalId,
                    secret,
                }));
                const command = new ConfirmDepositInternalContractRedeemed_1.default(deposit.idString);
                await handler.execute(command);
                const updatedDeposit = await depositRepository.getById(deposit.id.toValue());
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_2.STATUS_REDEEMED_IN_INTERNAL_BLOCKCHAIN);
                (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.secret).equals(secret);
            });
        });
        describe("error", () => {
            let deposit;
            it("should throw error if deposit with external id does not exist", async () => {
                const command = new ConfirmDepositInternalContractRedeemed_1.default("invalid_deposit_id");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositNotFound);
            });
        });
    });
});
//# sourceMappingURL=ConfirmDepositInternalContractRedeemedHandler.js.map