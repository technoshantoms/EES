"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const InternalBlockchain_1 = __importDefault(require("../../../../../../Context/InternalBlockchain/InternalBlockchain"));
const GetLastDepositContracts_1 = __importDefault(require("../../../../../../Context/Application/Query/InternalBlockchain/GetLastDepositContracts/GetLastDepositContracts"));
const GetLastDepositContractsHandler_1 = __importDefault(require("../../../../../../Context/Application/Query/InternalBlockchain/GetLastDepositContracts/GetLastDepositContractsHandler"));
const Setting_1 = __importDefault(require("../../../../../../Context/Setting/Setting"));
const Contract_1 = require("../../../../../Helpers/InternalBlockchain/Contract");
describe("GetLastDepositContractsHandler", () => {
    let internalBlockchain;
    let internalBlockchainRepository;
    let settings;
    let handler;
    beforeEach(async () => {
        internalBlockchain = await InternalBlockchain_1.default.init({ repository: "stub" });
        settings = new Setting_1.default({ repository: "stub" });
        internalBlockchainRepository = internalBlockchain.repository;
        handler = new GetLastDepositContractsHandler_1.default(internalBlockchain, settings);
    });
    describe("execute", () => {
        describe("success", () => {
            it("should empty response", async () => {
                const query = new GetLastDepositContracts_1.default();
                const result = await handler.execute(query);
                (0, chai_1.expect)(result.contracts).empty;
            });
            it("should return one contract", async () => {
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)());
                const query = new GetLastDepositContracts_1.default();
                const result = await handler.execute(query);
                (0, chai_1.expect)(result.contracts).length(1);
                const contract = result.contracts[0];
                (0, chai_1.expect)(contract.id).equals;
            });
            it("should return contract with correct parameters", async () => {
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.2",
                    externalId: "14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c",
                }));
                const query = new GetLastDepositContracts_1.default();
                const result = await handler.execute(query);
                const contract = result.contracts[0];
                (0, chai_1.expect)(contract.id).equals("1.16.2");
                (0, chai_1.expect)(contract.message).equals("14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c");
            });
            it("should return only deposit contracts", async () => {
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.2",
                    externalId: "",
                }));
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.3",
                    externalId: "14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c",
                }));
                const query = new GetLastDepositContracts_1.default();
                const result = await handler.execute(query);
                (0, chai_1.expect)(result.contracts).length(1);
                const contract = result.contracts[0];
                (0, chai_1.expect)(contract.id).equals("1.16.3");
                (0, chai_1.expect)(contract.message).equals("14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c");
            });
            it("should return only new contract", async () => {
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.2",
                    externalId: "14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55b",
                }));
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.3",
                    externalId: "14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c",
                }));
                settings.save("deposit_last_processed_internal_contract", "1.16.2");
                const query = new GetLastDepositContracts_1.default();
                const result = await handler.execute(query);
                (0, chai_1.expect)(result.contracts).length(1);
                const contract = result.contracts[0];
                (0, chai_1.expect)(contract.id).equals("1.16.3");
                (0, chai_1.expect)(contract.message).equals("14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c");
            });
        });
        describe("setting", () => {
            it("should save last processed contract", async () => {
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.2",
                    externalId: "",
                }));
                internalBlockchainRepository.addInternalContract((0, Contract_1.createContract)({
                    id: "1.16.3",
                    externalId: "14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c",
                }));
                const query = new GetLastDepositContracts_1.default();
                await handler.execute(query);
                const lastProcessedContract = await settings.load("deposit_last_processed_internal_contract", false);
                (0, chai_1.expect)(lastProcessedContract).not.false;
                (0, chai_1.expect)(lastProcessedContract).equals("1.16.3");
            });
        });
    });
});
//# sourceMappingURL=GetLastDepositContractsHandler.js.map