"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const DepositRequestRepository_1 = __importDefault(require("../../../../../Context/Infrastructure/Stub/DepositRequestRepository"));
const SubmitDepositRequestHandler_1 = __importDefault(require("../../../../../Context/Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler"));
const index_1 = require("../../../../../Context/index");
const Errors_1 = require("../../../../../Context/Domain/Errors");
const DepositRequest_1 = require("../../../../Helpers/DepositRequest");
const Errors_2 = require("../../../../../Context/Application/Command/SubmitDepositRequest/Errors");
describe("SubmitDepositRequestHandler", () => {
    let repository;
    let handler;
    const internalAccount = "native_account_name";
    const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
    beforeEach(function () {
        repository = new DepositRequestRepository_1.default();
        handler = new SubmitDepositRequestHandler_1.default(repository);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should save new deposit", async () => {
                const command = new index_1.SubmitDepositRequest(internalAccount, hashLock);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
                (0, chai_1.expect)(repository).repositorySize(1);
            });
        });
        describe("error", () => {
            it("should return error if account is empty", async () => {
                const command = new index_1.SubmitDepositRequest("", hashLock);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.NativeAccountValidationError);
            });
            it("should return error if hashLock is empty", async () => {
                const command = new index_1.SubmitDepositRequest(internalAccount, "");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.HashLockValidationError, "HashLock can not be empty");
            });
            it("should return error if hashLock is invalid", async () => {
                const command = new index_1.SubmitDepositRequest(internalAccount, "invalid_hashLock");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_1.HashLockValidationError, 'HashLock "invalid_hashLock" is invalid: HashLock format is invalid');
            });
            it("should return error if hashLock already exists", async () => {
                const command = new index_1.SubmitDepositRequest(internalAccount, hashLock);
                repository.create((0, DepositRequest_1.createDepositRequest)(internalAccount, hashLock));
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors_2.DepositRequestAlreadyExists);
            });
        });
    });
});
//# sourceMappingURL=SubmitDepositRequestHandler.js.map