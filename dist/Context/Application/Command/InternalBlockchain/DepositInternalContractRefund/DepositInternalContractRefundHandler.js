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
const InternalBlockchain_1 = __importDefault(require("../../../../InternalBlockchain/InternalBlockchain"));
const Errors = __importStar(require("./Errors"));
const common_1 = require("@nestjs/common");
const AssetNormalizer_1 = __importDefault(require("../../../../Infrastructure/AssetNormalizer"));
const ExternalBlockchain_1 = __importDefault(require("../../../../ExternalBlockchain/ExternalBlockchain"));
let DepositInternalContractRefundHandler = class DepositInternalContractRefundHandler {
    constructor(repository, internalBlockchain, externalBlockchain, normalizer, converter) {
        this.repository = repository;
        this.internalBlockchain = internalBlockchain;
        this.externalBlockchain = externalBlockchain;
        this.normalizer = normalizer;
        this.converter = converter;
    }
    async execute(command) {
        var _a;
        const deposit = await this.repository.getById(command.depositId);
        if (deposit === null) {
            throw new Errors.DepositNotFound(command.depositId);
        }
        const internalContractId = (_a = deposit.internalContract) === null || _a === void 0 ? void 0 : _a.internalId;
        if (!(await this.hasRefundOperation(internalContractId, deposit._depositRequest.nativeAccount.value))) {
            console.log(`DepositInternalContractRefundHandler: Deposit ${deposit.idString} has not refund yet.`);
            return;
        }
        console.log(`DepositInternalContractRefundHandler: Deposit ${deposit.idString} has refund.`);
        deposit.burned(deposit.mintedAmount);
        try {
            await this.internalBlockchain.burnAsset(deposit.mintedAmount);
            this.repository.save(deposit);
            console.log(`DepositInternalContractRefundHandler: Deposit ${deposit.idString} has burned.`);
        }
        catch (e) {
            console.log(`DepositInternalContractRefundHandler: Error processing deposit ${deposit.idString}`);
        }
    }
    async hasRefundOperation(internalContractId, accountName) {
        const refundOperations = await this.internalBlockchain.getRefundOperations(accountName);
        for (const refundOperation of refundOperations) {
            if (refundOperation.htlcContractId === internalContractId) {
                return true;
            }
        }
        return false;
    }
};
DepositInternalContractRefundHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __param(1, (0, common_1.Inject)("InternalBlockchain")),
    __param(4, (0, common_1.Inject)("ConverterInterface")),
    __metadata("design:paramtypes", [Object, InternalBlockchain_1.default,
        ExternalBlockchain_1.default,
        AssetNormalizer_1.default, Object])
], DepositInternalContractRefundHandler);
exports.default = DepositInternalContractRefundHandler;
//# sourceMappingURL=DepositInternalContractRefundHandler.js.map