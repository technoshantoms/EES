"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalWithdrawRedeemHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/ExternalWithdrawRedeemHandler"));
const ExternalWithdrawRedeem_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/ExternalWithdrawRedeem"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const chai_1 = require("chai");
const StubQueue_1 = __importDefault(require("../../../../../../Context/Queue/StubQueue"));
const QueueInterface_1 = require("../../../../../../Context/Queue/QueueInterface");
describe("ExternalWithdrawRedeemHandler", () => {
    let externalBlockchain;
    let stubRepository;
    let rabbitMQ;
    let handler;
    beforeEach(() => {
        externalBlockchain = new ExternalBlockchain_1.default("stub");
        stubRepository = externalBlockchain.repository;
        rabbitMQ = new StubQueue_1.default();
        handler = new ExternalWithdrawRedeemHandler_1.default(externalBlockchain, rabbitMQ);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should publish message", async () => {
                stubRepository._txIncluded = true;
                await handler.execute(new ExternalWithdrawRedeem_1.default("0x123", "0x123"));
                (0, chai_1.expect)(rabbitMQ.key).equal(QueueInterface_1.EXTERNAL_WITHDRAW_CONTRACT_REDEEM);
                (0, chai_1.expect)(rabbitMQ.message.txHash).equal("0x123");
                (0, chai_1.expect)(rabbitMQ.message.contractId).equal("0x123");
            });
        });
        describe("error", () => {
            it("should return error if transaction not found in blockchain", () => {
                stubRepository._txIncluded = false;
                const command = new ExternalWithdrawRedeem_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Transaction not found in blockchain");
            });
        });
    });
});
//# sourceMappingURL=ExternalWithdrawRedeemHandler.js.map