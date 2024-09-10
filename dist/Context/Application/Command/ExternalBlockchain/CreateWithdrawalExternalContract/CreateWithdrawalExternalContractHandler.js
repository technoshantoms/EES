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
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
const Errors = __importStar(require("./Errors"));
const CreateWithdrawExternalContractValidator_1 = __importDefault(require("../../../../Domain/Validation/Withdraw/CreateWithdrawExternalContractValidator"));
const WrappedEtherToEtherConverter_1 = __importDefault(require("../../../../Infrastructure/WrappedEtherToEtherConverter"));
const AssetNormalizer_1 = __importDefault(require("../../../../Infrastructure/AssetNormalizer"));
const common_1 = require("@nestjs/common");
const DomainError_1 = require("../../../../Core/Domain/DomainError");
const Errors_1 = require("./Errors");
const Helpers_1 = require("../../../../Infrastructure/Helpers");
const InternalBlockchain_1 = __importDefault(require("../../../../InternalBlockchain/InternalBlockchain"));
const config_1 = __importDefault(require("../../../../config"));
let CreateWithdrawalExternalContractHandler = class CreateWithdrawalExternalContractHandler {
    constructor(withdrawRepository, externalBlockchain, internalBlockChain, wrappedEtherToEtherConverter, normalizer) {
        this.withdrawRepository = withdrawRepository;
        this.externalBlockchain = externalBlockchain;
        this.internalBlockChain = internalBlockChain;
        this.wrappedEtherToEtherConverter = wrappedEtherToEtherConverter;
        this.normalizer = normalizer;
    }
    async execute(command) {
        const withdraw = await this.withdrawRepository.getById(command.withdrawId);
        if (null === withdraw) {
            throw new Errors.WithdrawNotExists(command.withdrawId);
        }
        try {
            new CreateWithdrawExternalContractValidator_1.default(withdraw).validate();
        }
        catch (e) {
            if (e instanceof DomainError_1.DomainError) {
                withdraw.error(e.message);
                this.withdrawRepository.save(withdraw);
                throw new Errors_1.PersistentError(e.message);
            }
        }
        const denormalizedAmount = await this.getDenormalizedContractAmount(withdraw);
        const txHash = await this.externalBlockchain.createWithdrawHTLC(withdraw.withdrawRequest.addressOfUserInEthereum, (0, Helpers_1.ensureHasPrefix)(withdraw.hashlock), Math.floor(Date.now() / 1000) + config_1.default.contract.withdraw_external_timelock * 60, denormalizedAmount);
        withdraw.sentInReply(txHash);
        await this.withdrawRepository.save(withdraw);
    }
    async getDenormalizedContractAmount(withdraw) {
        const normalizedAmount = this.normalizer.normalize(String(withdraw.amountOfHTLC), await this.internalBlockChain.getInternalAsset());
        return this.normalizer.denormalize(this.wrappedEtherToEtherConverter.convert(normalizedAmount), this.externalBlockchain.getAsset());
    }
    async getDenormalizedGasPrice() {
        return this.externalBlockchain.getGasPrice();
    }
};
CreateWithdrawalExternalContractHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __param(2, (0, common_1.Inject)("InternalBlockchain")),
    __metadata("design:paramtypes", [Object, ExternalBlockchain_1.default,
        InternalBlockchain_1.default,
        WrappedEtherToEtherConverter_1.default,
        AssetNormalizer_1.default])
], CreateWithdrawalExternalContractHandler);
exports.default = CreateWithdrawalExternalContractHandler;
//# sourceMappingURL=CreateWithdrawalExternalContractHandler.js.map