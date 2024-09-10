"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const InternalContract_1 = __importDefault(require("../../../../Domain/InternalContract"));
const common_1 = require("@nestjs/common");
const InternalBlockchain_1 = __importDefault(require("../../../../InternalBlockchain/InternalBlockchain"));
const AssetNormalizer_1 = __importDefault(require("../../../../Infrastructure/AssetNormalizer"));
const Withdraw_1 = __importDefault(require("../../../../Domain/Withdraw"));
let ConfirmWithdrawInternalContractCreatedHandler = class ConfirmWithdrawInternalContractCreatedHandler {
    constructor(withdrawRepository, withdrawRequestRepository, internalBlockchain, assetNormalizer) {
        this.withdrawRepository = withdrawRepository;
        this.withdrawRequestRepository = withdrawRequestRepository;
        this.internalBlockchain = internalBlockchain;
        this.assetNormalizer = assetNormalizer;
    }
    async execute(command) {
        var _a, _b, _c, _d, _e, _f;
        const requests = await this.withdrawRequestRepository.findAllCreated();
        this.validateTransaction(command.transaction);
        const sender = await this.internalBlockchain.getAccount((_a = command.transaction.htlcCreateSender) !== null && _a !== void 0 ? _a : "");
        const senderName = sender.get("name");
        const asset = await this.internalBlockchain.getAsset((_b = command.transaction.htlcCreateAssetId) !== null && _b !== void 0 ? _b : "");
        const normalizedAmount = this.assetNormalizer.normalize((_c = command.transaction.denormalizedAmount) !== null && _c !== void 0 ? _c : "", asset);
        if (requests.length === 0) {
            throw new Error(`Withdraw request for transaction ${command.transaction.transactionId}(${senderName}, ${normalizedAmount}) not found.`);
        }
        for (const request of requests) {
            if (request.nativeAccount.value === senderName && request.amountToPayInRQETH == normalizedAmount) {
                const internalContract = new InternalContract_1.default((_d = command.transaction.htlcId) !== null && _d !== void 0 ? _d : "");
                const withdraw = Withdraw_1.default.create(request, internalContract, (_e = command.transaction.htlcCreateId) !== null && _e !== void 0 ? _e : "", (_f = command.transaction.transferId) !== null && _f !== void 0 ? _f : "");
                request.withdrawCreated();
                this.withdrawRepository.save(withdraw);
                return;
            }
        }
        throw new Error(`Withdraw request for transaction ${command.transaction.transactionId}(${senderName}, ${normalizedAmount}) not found.`);
    }
    validateTransaction(transaction) {
        if (!transaction.htlcCreateSender) {
            throw new Error(`Undefined HTLC sender in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.denormalizedAmount) {
            throw new Error(`Undefined HTLC amount in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.htlcCreateAssetId) {
            throw new Error(`Undefined HTLC asset Id in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.htlcCreateId) {
            throw new Error(`Undefined HTLC operation ID in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.htlcId) {
            throw new Error(`Undefined HTLC ID in transaction ${transaction.transactionId}.`);
        }
        if (!transaction.transferId) {
            throw new Error(`Undefined Transfer operation ID in transaction ${transaction.transactionId}.`);
        }
    }
};
ConfirmWithdrawInternalContractCreatedHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __param(1, (0, common_1.Inject)("WithdrawRequestRepositoryInterface")),
    __param(2, (0, common_1.Inject)("InternalBlockchain")),
    __metadata("design:paramtypes", [Object, Object, InternalBlockchain_1.default,
        AssetNormalizer_1.default])
], ConfirmWithdrawInternalContractCreatedHandler);
exports.default = ConfirmWithdrawInternalContractCreatedHandler;
//# sourceMappingURL=ConfirmWithdrawInternalContractCreatedHandler.js.map