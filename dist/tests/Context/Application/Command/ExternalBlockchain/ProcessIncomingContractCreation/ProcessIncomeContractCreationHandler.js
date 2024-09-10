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
const DepositRequestRepository_1 = __importDefault(require("../../../../../../Context/Infrastructure/Stub/DepositRequestRepository"));
const ProcessIncomingContractCreationHandler_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/ProcessIncomingContractCreationHandler"));
const ProcessIncomingContractCreation_1 = __importDefault(require("../../../../../../Context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/ProcessIncomingContractCreation"));
const Errors = __importStar(require("../../../../../../Context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/Errors"));
const ErrorsDomain = __importStar(require("../../../../../../Context/Domain/Errors"));
const Contract_1 = require("../../../../../Helpers/ExternalBlockchain/Contract");
const dayjs_1 = __importDefault(require("dayjs"));
const DepositRequest_1 = require("../../../../../Helpers/DepositRequest");
const ExternalBlockchain_1 = __importDefault(require("../../../../../../Context/ExternalBlockchain/ExternalBlockchain"));
const HashLock_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/HashLock"));
const Address_1 = __importDefault(require("../../../../../../Context/Domain/ValueObject/Address"));
describe('ProcessIncomeContractCreationHandler', () => {
    let depositRepository;
    let depositRequestRepository;
    let externalBlockchain;
    let externalBlockchainRepository;
    let handler;
    const txHash = '0x2592cf699903e83bfd664aa4e339388fd044fe31643a85037be803a5d162729f';
    const hashLock = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
    const timeLock = (0, dayjs_1.default)().add(10, 'day').unix();
    const contractId = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
    const value = '10000000000000000';
    const sender = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198D';
    const receiver = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E';
    beforeEach(function () {
        depositRepository = new DepositRepository_1.default();
        depositRequestRepository = new DepositRequestRepository_1.default();
        externalBlockchain = new ExternalBlockchain_1.default('stub');
        externalBlockchainRepository = externalBlockchain.repository;
        handler = new ProcessIncomingContractCreationHandler_1.default(depositRepository, depositRequestRepository, externalBlockchain);
    });
    describe('execute', () => {
        describe('success', () => {
            beforeEach(() => {
                depositRepository.reset();
                depositRequestRepository.reset();
                externalBlockchainRepository.reset();
                externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                    contractId,
                    hashLock: hashLock,
                    timeLock: timeLock,
                    value: value
                });
                depositRequestRepository.create((0, DepositRequest_1.createDepositRequest)(undefined, hashLock));
            });
            it('should save new deposit', async () => {
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
                (0, chai_1.expect)(depositRepository).repositorySize(1);
            });
            it('should use correct deposit request', async () => {
                var _a;
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
                const deposit = depositRepository.first();
                (0, chai_1.expect)(deposit).not.null;
                (0, chai_1.expect)((_a = deposit._depositRequest) === null || _a === void 0 ? void 0 : _a.hashLock.equals(HashLock_1.default.create(hashLock))).true;
            });
            it('should use correct external contract', async () => {
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).fulfilled;
                const deposit = depositRepository.first();
                (0, chai_1.expect)(deposit).not.null;
                const externalContract = deposit._externalContract;
                (0, chai_1.expect)(externalContract.hashLock.equals(HashLock_1.default.create(hashLock))).true;
                (0, chai_1.expect)(externalContract.timeLock.unix).equals(timeLock);
                (0, chai_1.expect)(externalContract.value).equals(value);
                (0, chai_1.expect)(externalContract.sender.equals(Address_1.default.create(sender)), 'Sender is invalid.').true;
                (0, chai_1.expect)(externalContract.receiver.equals(Address_1.default.create(receiver)), 'Receiver is invalid.').true;
            });
        });
        describe('error', () => {
            it('should throw an error if the transaction is not included in the blockchain', async () => {
                externalBlockchainRepository._txIncluded = false;
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.TransactionNotFoundInBlockchain);
            });
            it('should throw an error if the deposit already exists', async () => {
                depositRepository._exists = true;
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositAlreadyExists);
            });
            it('should throw an error if the deposit request is not exists', async () => {
                externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                    contractId,
                    hashLock: '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c'
                });
                depositRequestRepository.create((0, DepositRequest_1.createDepositRequest)(undefined, '0x22383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55d'));
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.DepositRequestNotExists);
            });
            it('should throw an error if the external contract is not exists', async () => {
                const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                await (0, chai_1.expect)(handler.execute(command)).rejectedWith(Errors.ExternalContractNotExists);
            });
            describe('external contract validation', () => {
                it('should throw an error if the receiver is invalid', async () => {
                    externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                        receiver: '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198A'
                    });
                    const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                    await (0, chai_1.expect)(handler.execute(command)).rejectedWith(ErrorsDomain.ReceiverIsInvalid);
                });
                it('should throw an error if deposit value is too low', async () => {
                    externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                        value: '1'
                    });
                    const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                    await (0, chai_1.expect)(handler.execute(command)).rejectedWith(ErrorsDomain.DepositIsToSmall);
                });
                it('should throw an error if timeLock is too early', async () => {
                    externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                        timeLock: (0, dayjs_1.default)().add(1, 'day').unix()
                    });
                    const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                    await (0, chai_1.expect)(handler.execute(command)).rejectedWith(ErrorsDomain.TimeLockIsToSmall);
                });
                it('should throw an error if timeLock is too early', async () => {
                    externalBlockchainRepository._contract = (0, Contract_1.createContract)({
                        preimage: '0x0000000000000000000000000000000000000000000000000000000000000001'
                    });
                    const command = new ProcessIncomingContractCreation_1.default(txHash, contractId);
                    await (0, chai_1.expect)(handler.execute(command)).rejectedWith(ErrorsDomain.PreimageNotEmpty);
                });
            });
        });
    });
});
//# sourceMappingURL=ProcessIncomeContractCreationHandler.js.map