"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hooks_1 = require("../../../../hooks");
const Deposit_1 = require("../../../../../../Context/Domain/Deposit");
const InternalContract_1 = __importDefault(require("../../../../../../Context/Domain/InternalContract"));
const DepositRequestRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/TypeORM/DepositRequestRepository"));
const DepositRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/TypeORM/DepositRepository"));
const InternalBlockchain_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/InternalBlockchain"));
const ConfirmDepositInternalContractRedeemed_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemed"));
const ConfirmDepositInternalContractRedeemedHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemedHandler"));
const Deposit_2 = require("../../../../../Helpers/Deposit");
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
const DepositRequest_1 = require("../../../../../Helpers/DepositRequest");
const OperationRedeem_1 = require("../../../../../Helpers/InternalBlockchain/OperationRedeem");
describe("ConfirmDepositInternalContractRedeemed", async () => {
    let depositRepository;
    let depositRequestRepository;
    let internalBlockchain;
    let internalBlockchainRepository;
    let handler;
    let deposit;
    before(async () => {
        depositRepository = new DepositRepository_1.default(hooks_1.dataSourceTest);
        depositRequestRepository = new DepositRequestRepository_1.default(hooks_1.dataSourceTest);
        internalBlockchain = await InternalBlockchain_1.default.init({
            repository: "stub",
        });
        internalBlockchainRepository = internalBlockchain.repository;
        handler = new ConfirmDepositInternalContractRedeemedHandler_1.default(depositRepository, internalBlockchain);
    });
    describe("success", async () => {
        beforeEach(async () => {
            const depositRequest = (0, DepositRequest_1.createDepositRequest)();
            await depositRequestRepository.create(depositRequest);
            deposit = (0, Deposit_2.createDeposit)({
                depositRequest,
                externalContract: (0, ExternalContract_1.createExternalContract)(),
            });
            deposit.submittedToInternalBlockchain("1000000");
            const internalContract = new InternalContract_1.default("1.16.1");
            deposit.createdInInternalBlockchain(internalContract);
            await depositRepository.create(deposit);
        });
        it("should not update deposit if it is not redeemed", async () => {
            const command = new ConfirmDepositInternalContractRedeemed_1.default(deposit.idString);
            await handler.execute(command);
            const updatedDeposit = await depositRepository.getById(deposit.id.toValue().toString());
            (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN);
        });
        it("should update deposit if it is redeemed", async () => {
            var _a;
            const secret = "b85a0e9f792cb3a9bc7dc75fdb1b795e91cf91ffddacc8d7869638079b02850b";
            internalBlockchainRepository.addRedeemOperation((0, OperationRedeem_1.createOperationRedeem)({
                internalContractId: (_a = deposit.internalContract) === null || _a === void 0 ? void 0 : _a.internalId,
                secret,
            }));
            const command = new ConfirmDepositInternalContractRedeemed_1.default(deposit.idString);
            await handler.execute(command);
            const updatedDeposit = await depositRepository.getById(deposit.idString);
            (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_1.STATUS_REDEEMED_IN_INTERNAL_BLOCKCHAIN);
            (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.secret).equals(secret);
        });
    });
});
//# sourceMappingURL=ConfirmDepositInternalContractRedeemed.js.map