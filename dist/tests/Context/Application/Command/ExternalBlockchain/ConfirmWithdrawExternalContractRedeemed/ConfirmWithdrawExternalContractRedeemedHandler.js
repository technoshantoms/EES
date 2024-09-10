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
const WithdrawStubRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/WithdrawStubRepository"));
const ConfirmWithdrawExternalContractRedeemedHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemedHandler"));
const Setting_1 = __importDefault(require("../../../../../../Context/Setting/Setting"));
const ConfirmWithdrawExternalContractRedeemed_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemed"));
const StubRepository_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/Repository/StubRepository"));
const ConsoleNotifier_1 = __importDefault(require("../../../../../../Context/Notifier/ConsoleNotifier"));
const Withdraw_1 = __importStar(require("../../../../../../Context/Domain/Withdraw"));
const WithdrawRequest_1 = __importDefault(require("../../../../../../Context/Domain/WithdrawRequest"));
const NativeAccount_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/NativeAccount"));
const InternalContract_1 = __importDefault(require("../../../../../../Context/Domain/InternalContract"));
const chai_1 = require("chai");
const Contract_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/Contract"));
const ExternalContract_1 = __importDefault(require("../../../../../../Context/Domain/ExternalContract"));
const UniqueEntityID_1 = __importDefault(require("../../../../../../Context/Core/Domain/UniqueEntityID"));
const Address_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/Address"));
const HashLock_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/HashLock"));
const TimeLock_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/TimeLock"));
describe("ConfirmWithdrawExternalContractRedeemedHandler", () => {
    let withdrawRepository;
    let externalBlockchain;
    let notifier;
    let setting;
    let handler;
    let withdraw;
    let contract;
    let externalContract;
    beforeEach(function () {
        withdrawRepository = new WithdrawStubRepository_1.default();
        externalBlockchain = new StubRepository_1.default();
        notifier = new ConsoleNotifier_1.default();
        setting = new Setting_1.default({
            repository: "stub",
        });
        handler = new ConfirmWithdrawExternalContractRedeemedHandler_1.default(withdrawRepository, externalBlockchain, notifier, setting);
        withdraw = new Withdraw_1.default(WithdrawRequest_1.default.create(NativeAccount_1.default.create("native_account_name"), 1, "0x0000000AddressOfUserInEthereum", 1, "ETH"), new InternalContract_1.default("0x123InternalContract"), "0x123CreateOperationId", "0x123TransferOperationId");
        withdrawRepository.save(withdraw);
        contract = new Contract_1.default("0x123ContractId", "0x123Sender", "0x123Receiver", "0x123Value", "0x123HashLock", 1, true, false, "0x123Preimage");
        externalBlockchain._contract = contract;
        externalContract = new ExternalContract_1.default(new UniqueEntityID_1.default("0x123ExternalContractId"), Address_1.default.create("0xabc1234567890123456789012345678901234567"), Address_1.default.create("0xbcd1234567890123456789012345678901234567"), "0x123Value", HashLock_1.default.create("0xcdfabc1234567890123456789012345678901234567abc123456789012345678"), TimeLock_1.default.fromDate(new Date()), "0x123TxHash");
        withdraw.externalContract = externalContract;
        withdraw.status = Withdraw_1.STATUS_READY_TO_SIGN;
        externalBlockchain._transactionReceipt = {
            status: true,
            transactionHash: "0x123TxHash",
            transactionIndex: 1,
            blockHash: "0x123BlockHash",
            blockNumber: 1,
            from: "0x123From",
            to: "0x123To",
            cumulativeGasUsed: 1,
            gasUsed: 1,
            effectiveGasPrice: 1,
            logs: [],
            logsBloom: "0x123LogsBloom",
        };
    });
    describe("execute", () => {
        describe("success", () => {
            it("should redeemed withdraw", async () => {
                await handler.execute(new ConfirmWithdrawExternalContractRedeemed_1.default("0x123TxHash", externalContract.idString));
                (0, chai_1.expect)(withdraw.status).eq(Withdraw_1.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN);
                (0, chai_1.expect)(withdraw.externalBlockchainRedeemTxHash).eq("0x123TxHash");
            });
        });
        describe("error", () => {
            it("should return error if withdraw non exist", () => {
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Withdraw not exists");
            });
            it("should return error if contract is not withdrawn", () => {
                externalBlockchain._contract = new Contract_1.default("0x123ContractId", "0x123Sender", "0x123Receiver", "0x123Value", "0x123HashLock", 1, false, false, "0x123Preimage");
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Contract withdrawn is false");
            });
            it("should return error if contract without preimage", () => {
                externalBlockchain._contract = new Contract_1.default("0x123ContractId", "0x123Sender", "0x123Receiver", "0x123Value", "0x123HashLock", 1, true, false, "");
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Contract without preimage");
            });
            it("should return error if contract not found", () => {
                externalBlockchain._contract = null;
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Contract not found");
            });
            it("should return error if receipt is reversible", () => {
                if (externalBlockchain._transactionReceipt) {
                    externalBlockchain._transactionReceipt.blockNumber = externalBlockchain._lastBlockNumber + 1;
                }
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Receipt is reversible");
            });
            it("should return error if receipt not found", () => {
                externalBlockchain._transactionReceipt = null;
                const command = new ConfirmWithdrawExternalContractRedeemed_1.default("0x123", "0x123");
                (0, chai_1.expect)(handler.execute(command)).rejectedWith("Transaction receipt not found");
            });
        });
    });
});
//# sourceMappingURL=ConfirmWithdrawExternalContractRedeemedHandler.js.map