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
const chai_1 = require("chai");
const DepositRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/DepositRepository"));
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const RedeemDepositExternalContract_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContract"));
const RedeemDepositExternalContractHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/RedeemDepositExternalContractHandler"));
const Errors = __importStar(require("../../../../../../Context/Application/Command/ExternalBlockchain/RedeemDepositExternalContract/Errors"));
const ErrorsDomain = __importStar(require("../../../../../../Context/Domain/Errors"));
const Deposit_1 = require("../../../../../Helpers/Deposit");
const InternalContract_1 = require("../../../../../Helpers/InternalContract");
const ExternalContract_1 = require("../../../../../Helpers/ExternalContract");
const config_1 = __importDefault(require("../../../../../../Context/config"));
describe("RedeemDepositExternalContractHandler", () => {
    let depositRepository;
    let externalBlockchain;
    let externalBlockchainRepository;
    let handler;
    beforeEach(function () {
        depositRepository = new DepositRepository_1.default();
        externalBlockchain = new ExternalBlockchain_1.default("stub");
        externalBlockchainRepository = externalBlockchain.repository;
        handler = new RedeemDepositExternalContractHandler_1.default(depositRepository, externalBlockchain);
    });
    describe("execute", () => {
        describe("success", () => {
            const contractId = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
            const secret = "9ba1896f3f462f454bb52e886f730de572664efa07b34001ffc2277d5ab24347";
            let externalContract;
            let deposit;
            beforeEach(() => {
                externalContract = (0, ExternalContract_1.createExternalContract)({
                    id: contractId,
                });
                deposit = (0, Deposit_1.createDeposit)({
                    externalContract,
                });
                deposit.submittedToInternalBlockchain("1000000");
                deposit.createdInInternalBlockchain((0, InternalContract_1.createInternalContract)());
                deposit.redeemedInInternalBlockchain(secret);
                depositRepository.create(deposit);
            });
            it("should redeem deposit", async () => {
                const command = new RedeemDepositExternalContract_1.default(deposit.idString);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
            });
            it("should use send correct request to an external blockchain", async () => {
                const command = new RedeemDepositExternalContract_1.default(deposit.idString);
                await handler.execute(command);
                (0, chai_1.expect)(externalBlockchainRepository._redeemedRequests).length(1);
                const redeemRequest = externalBlockchainRepository._redeemedRequests[0];
                (0, chai_1.expect)(redeemRequest.contractId).equals(contractId);
                (0, chai_1.expect)(redeemRequest.receiver).equals(config_1.default.eth.receiver);
                (0, chai_1.expect)(redeemRequest.secret).equals("0x39626131383936663366343632663435346262353265383836663733306465353732363634656661303762333430303166666332323737643561623234333437");
            });
        });
        describe("error", () => {
            it("should throw an error if the deposit does not exist", async () => {
                const command = new RedeemDepositExternalContract_1.default("invalid_deposit_id");
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositNotExists);
            });
            it("should throw error if deposit status is invalid (and secret is empty)", async () => {
                const deposit = (0, Deposit_1.createDeposit)();
                depositRepository.create(deposit);
                const command = new RedeemDepositExternalContract_1.default(deposit.idString);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(ErrorsDomain.RedeemExecutedInExternalBlockchainStatusError);
            });
        });
    });
});
//# sourceMappingURL=RedeemDepositExternalContractHandler.js.map