"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubmitWithdrawRequestHandler_1 = __importDefault(require("../../../../../Context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler"));
const WithdrawRequestRepository_1 = __importDefault(require("../../../../../Context/Infrastructure/Stub/WithdrawRequestRepository"));
const SubmitWithdrawRequest_1 = __importDefault(require("../../../../../Context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequest"));
const chai_1 = require("chai");
const Errors_1 = require("../../../../../Context/Domain/Errors");
describe("SubmitWithdrawRequestHandler", () => {
    let repository;
    let handler;
    const internalAccount = "native_account_name";
    beforeEach(function () {
        repository = new WithdrawRequestRepository_1.default();
        handler = new SubmitWithdrawRequestHandler_1.default(repository);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should save new withdraw request", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 1, "0x0000000", 1, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
                (0, chai_1.expect)(repository).repositorySize(1);
            });
        });
        describe("error", () => {
            it("should return error if account is empty", async () => {
                const command = new SubmitWithdrawRequest_1.default("", 1, "0x0000000", 1, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.NativeAccountValidationError);
            });
            it("should return error if amount to pay in RQETH is empty", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 0, "0x0000000", 1, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.WithdrawRequestValidationError, "Amount to pay in RQETH can not be negative or zero");
            });
            it("should return error if address of user in Ethereum is empty", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 1, "", 1, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.WithdrawRequestValidationError, "Address of user in Ethereum can not be empty");
            });
            it("should return error if withdrawal fee amount is empty", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 1, "0x0000000", 0, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.WithdrawRequestValidationError, "Withdrawal fee amount can not be negative or zero");
            });
            it("should return error if withdrawal fee currency is empty", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 1, "0x0000000", 1, "");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.WithdrawRequestValidationError, "Withdrawal fee currency can not be empty");
            });
            it("should return error if withdrawal fee currency is invalid", async () => {
                const command = new SubmitWithdrawRequest_1.default(internalAccount, 1, "0x0000000", 1, "");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.WithdrawRequestValidationError, "Withdrawal fee currency can not be empty");
            });
            it("should return error if withdrawal account is wrong", async () => {
                const command = new SubmitWithdrawRequest_1.default("", 1, "0x0000000", 1, "ETH");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.NativeAccountValidationError, 'Account name "" is invalid: Native account can not be empty');
            });
        });
    });
});
//# sourceMappingURL=SubmitWithdrawRequestHandler.js.map