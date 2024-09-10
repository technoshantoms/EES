"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hooks_1 = require("../../../../hooks");
const DepositRequestRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/TypeORM/DepositRequestRepository"));
const DepositRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/TypeORM/DepositRepository"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const RedeemDepositExternalContractHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContractHandler"));
const RedeemDepositExternalContract_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContract"));
const Deposit_1 = require("../../../../../Helpers/Deposit");
const Deposit_2 = require("../../../../../../Context/Domain/Deposit");
const DepositRequest_1 = require("../../../../../Helpers/DepositRequest");
const InternalContract_1 = require("../../../../../Helpers/InternalContract");
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
describe("RedeemDepositExternalContractHandler", async () => {
    let depositRequestRepository;
    let depositRepository;
    let externalBlockchainRepository;
    let handler;
    before(async () => {
        depositRequestRepository = new DepositRequestRepository_1.default(hooks_1.dataSourceTest);
        depositRepository = new DepositRepository_1.default(hooks_1.dataSourceTest);
        const externalBlockchain = new ExternalBlockchain_1.default("stub");
        externalBlockchainRepository = externalBlockchain.repository;
        handler = new RedeemDepositExternalContractHandler_1.default(depositRepository, externalBlockchain);
    });
    describe("success", async () => {
        let deposit;
        const contractId = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
        const secret = "9ba1896f3f462f454bb52e886f730de572664efa07b34001ffc2277d5ab24347";
        beforeEach(async () => {
            const depositRequest = (0, DepositRequest_1.createDepositRequest)();
            await depositRequestRepository.create(depositRequest);
            const externalContract = (0, ExternalContract_1.createExternalContract)({
                id: contractId,
            });
            deposit = (0, Deposit_1.createDeposit)({ depositRequest, externalContract });
            deposit.submittedToInternalBlockchain("1000000");
            deposit.createdInInternalBlockchain((0, InternalContract_1.createInternalContract)());
            deposit.redeemedInInternalBlockchain(secret);
            await depositRepository.create(deposit);
        });
        it("should redeem external contract", async () => {
            externalBlockchainRepository._redeemTxHash = "redeem_tx_hash";
            const command = new RedeemDepositExternalContract_1.default(deposit.id.toValue().toString());
            await (0, chai_1.expect)(handler.execute(command)).fulfilled;
            const updatedDeposit = await depositRepository.getById(deposit.idString);
            (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.status).equals(Deposit_2.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN);
            (0, chai_1.expect)(updatedDeposit === null || updatedDeposit === void 0 ? void 0 : updatedDeposit.externalBlockchainRedeemTxHash).equals("redeem_tx_hash");
        });
    });
});
//# sourceMappingURL=RedeemDepositExternalContractHandler.js.map