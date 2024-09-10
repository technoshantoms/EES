"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hooks_1 = require("../../../hooks");
const index_1 = require("../../../../../Context/index");
const SubmitDepositRequestHandler_1 = __importDefault(require("../../../../../Context/Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler"));
const DepositRequestRepository_1 = __importDefault(require("../../../../../Context/Infrastructure/TypeORM/DepositRequestRepository"));
describe("SubmitDepositRequest", async () => {
    let repository;
    let handler;
    beforeEach(async () => {
        repository = new DepositRequestRepository_1.default(hooks_1.dataSourceTest);
        handler = new SubmitDepositRequestHandler_1.default(repository);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should create deposit", async () => {
                const nativeAccount = "native_account_name";
                const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
                const command = new index_1.SubmitDepositRequest(nativeAccount, hashLock);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
            });
        });
    });
});
//# sourceMappingURL=SubmitDepositRequestHandler.js.map