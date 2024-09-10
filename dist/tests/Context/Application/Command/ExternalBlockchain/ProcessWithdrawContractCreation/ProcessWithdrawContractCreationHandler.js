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
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const WithdrawStubRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/WithdrawStubRepository"));
const ProcessWithdrawContractCreationHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ProcessWithdrawContractCreation/ProcessWithdrawContractCreationHandler"));
const Withdraw_1 = __importStar(require("../../../../../../Context/Domain/Withdraw"));
const WithdrawRequest_1 = __importDefault(require("../../../../../../Context/Domain/WithdrawRequest"));
const NativeAccount_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/NativeAccount"));
const InternalContract_1 = __importDefault(require("../../../../../../Context/Domain/InternalContract"));
const UniqueEntityID_1 = __importDefault(require("../../../../../../Context/Core/Domain/UniqueEntityID"));
const Contract_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/Contract"));
const ProcessWithdrawContractCreation_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ProcessWithdrawContractCreation/ProcessWithdrawContractCreation"));
const chai_1 = require("chai");
const config_1 = __importDefault(require("../../../../../../Context/config"));
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("@ethersproject/constants");
describe("ProcessWithdrawContractCreationHandler", () => {
    let contractId = "";
    let externalBlockchain;
    let stubRepository;
    let withdrawRepository;
    let handler;
    let withdraw;
    let txHash = "";
    beforeEach(() => {
        txHash = "0x2592cf699903e83bfd664aa4e339388fd044fe31643a85037be803a5d162729f";
        contractId = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
        externalBlockchain = new ExternalBlockchain_1.default("stub");
        stubRepository = externalBlockchain.repository;
        withdrawRepository = new WithdrawStubRepository_1.default();
        withdraw = new Withdraw_1.default(WithdrawRequest_1.default.create(NativeAccount_1.default.create("123"), 1, "0x123", 0.1, "RQRX"), new InternalContract_1.default("0x123"), "0x123", "0x123");
        withdraw.id = new UniqueEntityID_1.default("123");
        withdraw.txHash = txHash;
        withdrawRepository.save(withdraw);
        stubRepository._contract = new Contract_1.default(contractId, config_1.default.eth.receiver, "0x1234567890123456789012345678901234567890", config_1.default.eth.minimum_deposit_amount.addn(0.01).toString(), "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
            .add(config_1.default.contract.minimum_timelock + 5, "minutes")
            .unix(), false, false, constants_1.HashZero);
        handler = new ProcessWithdrawContractCreationHandler_1.default(withdrawRepository, externalBlockchain);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should not process withdraw", async () => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_SEND_IN_REPLY;
                const command = new ProcessWithdrawContractCreation_1.default((_a = withdraw.txHash) !== null && _a !== void 0 ? _a : "", (_c = (_b = stubRepository._contract) === null || _b === void 0 ? void 0 : _b.contractId) !== null && _c !== void 0 ? _c : "");
                await handler.execute(command);
                (0, chai_1.expect)((_d = withdraw.externalContract) === null || _d === void 0 ? void 0 : _d.idString).equal((_e = stubRepository._contract) === null || _e === void 0 ? void 0 : _e.contractId);
                (0, chai_1.expect)((_f = withdraw.externalContract) === null || _f === void 0 ? void 0 : _f.sender.value).equal((_g = stubRepository._contract) === null || _g === void 0 ? void 0 : _g.sender);
                (0, chai_1.expect)((_h = withdraw.externalContract) === null || _h === void 0 ? void 0 : _h.receiver.value).equal((_j = stubRepository._contract) === null || _j === void 0 ? void 0 : _j.receiver);
                (0, chai_1.expect)((_k = withdraw.externalContract) === null || _k === void 0 ? void 0 : _k.value).equal((_l = stubRepository._contract) === null || _l === void 0 ? void 0 : _l.value);
                (0, chai_1.expect)((_m = withdraw.externalContract) === null || _m === void 0 ? void 0 : _m.hashLock.value).equal((_o = stubRepository._contract) === null || _o === void 0 ? void 0 : _o.hashLock);
                (0, chai_1.expect)((_p = withdraw.externalContract) === null || _p === void 0 ? void 0 : _p.timeLock.value.unix()).equal((_q = stubRepository._contract) === null || _q === void 0 ? void 0 : _q.timeLock);
                (0, chai_1.expect)((_r = withdraw.externalContract) === null || _r === void 0 ? void 0 : _r.txHash).equal(command.txHash);
                (0, chai_1.expect)(withdraw.status).equal(Withdraw_1.STATUS_READY_TO_SIGN);
            });
        });
        describe("error", () => {
            it("should return error if transaction not found in blockchain", async () => {
                stubRepository._txIncluded = false;
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`The transaction with hash "${txHash}" was not found in blockchain.`);
            });
            it("should return error if external contract not exists", async () => {
                stubRepository._txIncluded = true;
                stubRepository._contract = null;
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`The external contract "${command.contractId}" is not exists in the blockchain.`);
            });
            it("should return error if withdraw not exists", async () => {
                stubRepository._txIncluded = true;
                txHash = "0x2592cf699903e83bfd664aa4e339388fd044fe31643a85037be803a5d162729g";
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`The withdraw with txHash "${txHash}" not exists.`);
            });
            it("should return error if withdraw is not ready to sign", async () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_READY_TO_SIGN;
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`WithdrawId: ${withdraw.id}. Status ${withdraw.status} is invalid.`);
            });
            it("should return error if withdraw sender is invalid", async () => {
                stubRepository._txIncluded = true;
                stubRepository._contract = new Contract_1.default(contractId, "0x123", "0x1234567890123456789012345678901234567890", config_1.default.eth.minimum_deposit_amount.addn(0.01).toString(), "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
                    .add(config_1.default.contract.minimum_timelock + 5, "minutes")
                    .unix(), false, false, constants_1.HashZero);
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`The sender is invalid.`);
            });
            it("should return error if withdraw value is invalid", async () => {
                var _a;
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_SEND_IN_REPLY;
                stubRepository._contract = new Contract_1.default(contractId, config_1.default.eth.receiver, "0x1234567890123456789012345678901234567890", "0.0001", "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
                    .add(config_1.default.contract.minimum_timelock + 5, "minutes")
                    .unix(), false, false, constants_1.HashZero);
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`The deposit ${(_a = stubRepository._contract) === null || _a === void 0 ? void 0 : _a.value} is to small. Minimum deposit is ${config_1.default.eth.minimum_withdraw_amount.toString()}.`);
            });
            it("should return error if withdraw is already withdrawn", async () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_SEND_IN_REPLY;
                stubRepository._contract = new Contract_1.default(contractId, config_1.default.eth.receiver, "0x1234567890123456789012345678901234567890", config_1.default.eth.minimum_deposit_amount.addn(0.01).toString(), "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
                    .add(config_1.default.contract.minimum_timelock + 5, "minutes")
                    .unix(), true, false, constants_1.HashZero);
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`Contract is already withdrawn.`);
            });
            it("should return error if withdraw is already refunded", async () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_SEND_IN_REPLY;
                stubRepository._contract = new Contract_1.default(contractId, config_1.default.eth.receiver, "0x1234567890123456789012345678901234567890", config_1.default.eth.minimum_deposit_amount.addn(0.01).toString(), "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
                    .add(config_1.default.contract.minimum_timelock + 5, "minutes")
                    .unix(), false, true, constants_1.HashZero);
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`Contract is already refunded.`);
            });
            it("should return error if withdraw preimage is not empty", async () => {
                stubRepository._txIncluded = true;
                withdraw.status = Withdraw_1.STATUS_SEND_IN_REPLY;
                stubRepository._contract = new Contract_1.default(contractId, config_1.default.eth.receiver, "0x1234567890123456789012345678901234567890", config_1.default.eth.minimum_deposit_amount.addn(0.01).toString(), "0x1234567890123456789012345678901234567890123456789012345678901234", (0, dayjs_1.default)()
                    .add(config_1.default.contract.minimum_timelock + 5, "minutes")
                    .unix(), false, false, "0x1234567890123456789012345678901234567890123456789012345678901234");
                const command = new ProcessWithdrawContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(`Preimage is not empty.`);
            });
        });
    });
});
//# sourceMappingURL=ProcessWithdrawContractCreationHandler.js.map