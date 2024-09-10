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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors = __importStar(require("./Errors"));
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
const HashLock_1 = __importDefault(require("../../../../Domain/ValueObject/HashLock"));
const DepositExternalContractValidator_1 = __importDefault(require("../DepositExternalContractValidator"));
const ExternalContract_1 = __importDefault(require("../../../../Domain/ExternalContract"));
const UniqueEntityID_1 = __importDefault(require("../../../../Core/Domain/UniqueEntityID"));
const Deposit_1 = __importDefault(require("../../../../Domain/Deposit"));
const Errors_1 = require("../../../../Infrastructure/Errors");
const Address_1 = __importDefault(require("../../../../Domain/ValueObject/Address"));
const TimeLock_1 = __importDefault(require("../../../../Domain/ValueObject/TimeLock"));
const common_1 = require("@nestjs/common");
let ProcessIncomingContractCreationHandler = class ProcessIncomingContractCreationHandler {
    constructor(repository, depositRequestRepository, externalBlockchain) {
        this.repository = repository;
        this.depositRequestRepository = depositRequestRepository;
        this.externalBlockchain = externalBlockchain;
    }
    async execute(command) {
        const txIncluded = await this.externalBlockchain.repository.txIncluded(command.txHash);
        if (!txIncluded) {
            throw new Errors.TransactionNotFoundInBlockchain(command.txHash);
        }
        const depositExists = await this.repository.exists(command.contractId);
        if (depositExists) {
            throw new Errors.DepositAlreadyExists(command.contractId);
        }
        const contract = await this.externalBlockchain.repository.loadDepositContract(command.txHash, command.contractId);
        if (null === contract) {
            throw new Errors.ExternalContractNotExists(command.contractId);
        }
        const validator = new DepositExternalContractValidator_1.default(contract);
        validator.validate();
        validator.validateTimeLock();
        const externalContract = new ExternalContract_1.default(new UniqueEntityID_1.default(contract.contractId), Address_1.default.create(contract.sender), Address_1.default.create(contract.receiver), contract.value, HashLock_1.default.create(contract.hashLock), TimeLock_1.default.fromUnix(contract.timeLock), command.txHash);
        const depositRequest = await this.depositRequestRepository.load(HashLock_1.default.create(contract.hashLock));
        if (null === depositRequest) {
            throw new Errors.DepositRequestNotExists(contract.hashLock);
        }
        const deposit = Deposit_1.default.create(depositRequest, externalContract);
        try {
            await this.repository.create(deposit);
        }
        catch (e) {
            throw new Errors_1.DatabaseConnectionError();
        }
    }
};
ProcessIncomingContractCreationHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __param(1, (0, common_1.Inject)("DepositRequestRepositoryInterface")),
    __metadata("design:paramtypes", [Object, Object, ExternalBlockchain_1.default])
], ProcessIncomingContractCreationHandler);
exports.default = ProcessIncomingContractCreationHandler;
//# sourceMappingURL=ProcessIncomingContractCreationHandler.js.map