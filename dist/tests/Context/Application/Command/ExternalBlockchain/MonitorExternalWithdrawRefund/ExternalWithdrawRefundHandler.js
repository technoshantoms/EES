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
const ExternalWithdrawRefundHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRefund/ExternalWithdrawRefundHandler"));
const ExternalWithdrawRefund_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRefund/ExternalWithdrawRefund"));
const WithdrawStubRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/WithdrawStubRepository"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const chai_1 = require("chai");
const Withdraw_1 = __importStar(require("../../../../../../Context/Domain/Withdraw"));
const WithdrawRequest_1 = __importDefault(require("../../../../../../Context/Domain/WithdrawRequest"));
const NativeAccount_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/NativeAccount"));
const InternalContract_1 = __importDefault(require("../../../../../../Context/Domain/InternalContract"));
const UniqueEntityID_1 = __importDefault(require("../../../../../../Context/Core/Domain/UniqueEntityID"));
describe("ExternalWithdrawRefundHandler", () => {
    let externalBlockchain;
    let stubRepository;
    let withdrawRepository;
    let handler;
    let withdraw;
    beforeEach(() => {
        externalBlockchain = new ExternalBlockchain_1.default("stub");
        stubRepository = externalBlockchain.repository;
        withdrawRepository = new WithdrawStubRepository_1.default();
        withdraw = new Withdraw_1.default(WithdrawRequest_1.default.create(NativeAccount_1.default.create("123"), 1, "0x123", 0.1, "RQRX"), new InternalContract_1.default("0x123"), "0x123", "0x123");
        withdraw.id = new UniqueEntityID_1.default("123");
        withdraw.externalBlockchainRefundTxHash = "0x123";
        withdrawRepository.save(withdraw);
        handler = new ExternalWithdrawRefundHandler_1.default(externalBlockchain, withdrawRepository);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should not refund withdraw", () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_REFUND;
                handler.execute(new ExternalWithdrawRefund_1.default("0x124", "0x123"));
                (0, chai_1.expect)(withdraw.status).equal(Withdraw_1.STATUS_REFUND);
            });
            it("should refund withdraw", async () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_REFUND;
                await handler.execute(new ExternalWithdrawRefund_1.default("0x123", "0x123"));
                (0, chai_1.expect)(withdraw.status).equal(Withdraw_1.STATUS_REFUNDED);
            });
        });
        describe("error", () => {
            it("should return error if transaction not found in blockchain", () => {
                stubRepository._txIncluded = false;
                (0, chai_1.expect)(handler.execute(new ExternalWithdrawRefund_1.default("0x123", "0x123"))).rejectedWith('The transaction with hash "0x123" was not found in blockchain.');
            });
        });
    });
});
//# sourceMappingURL=ExternalWithdrawRefundHandler.js.map