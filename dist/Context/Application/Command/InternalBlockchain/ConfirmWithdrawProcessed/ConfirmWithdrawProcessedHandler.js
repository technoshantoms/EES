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
const common_1 = require("@nestjs/common");
const InternalBlockchain_1 = __importDefault(require("../../../../InternalBlockchain/InternalBlockchain"));
const AssetNormalizer_1 = __importDefault(require("../../../../Infrastructure/AssetNormalizer"));
const Setting_1 = __importStar(require("../../../../Setting/Setting"));
const dayjs_1 = __importDefault(require("dayjs"));
const Errors = __importStar(require("./Errors"));
let ConfirmWithdrawProcessedHandler = class ConfirmWithdrawProcessedHandler {
    constructor(withdrawRepository, internalBlockchain, normalizer, setting, notifier) {
        this.withdrawRepository = withdrawRepository;
        this.internalBlockchain = internalBlockchain;
        this.normalizer = normalizer;
        this.setting = setting;
        this.notifier = notifier;
        this.lastIrreversibleBlockNumber = undefined;
    }
    async execute(command) {
        var _a, _b;
        this.lastIrreversibleBlockNumber = undefined;
        if (command.withdraw.internalRedeemBlockNumber &&
            (await this.isLastIrreversible(command.withdraw.internalRedeemBlockNumber))) {
            command.withdraw.processed();
            await this.withdrawRepository.save(command.withdraw);
            return;
        }
        const alertPeriod = parseInt(await this.setting.load(Setting_1.INTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT, "86400"));
        const timeDifference = (0, dayjs_1.default)(command.withdraw.internalContract.createdAt)
            .add((_a = command.withdraw.timelock) !== null && _a !== void 0 ? _a : 0, "minutes")
            .diff((0, dayjs_1.default)(), "seconds");
        if (timeDifference > alertPeriod) {
            await this.notifier.sendMessage("Timeout of HTLC Redeem in Internal Blockchain");
            throw new Errors.BlockIsReversible((_b = command.withdraw.externalBlockchainRedeemTxHash) !== null && _b !== void 0 ? _b : "");
        }
        throw new Error("Error processing redeem");
    }
    async isLastIrreversible(blockNumber) {
        if (!this.lastIrreversibleBlockNumber) {
            this.lastIrreversibleBlockNumber = await this.internalBlockchain.getLastIrreversibleBlockNumber();
        }
        return blockNumber <= this.lastIrreversibleBlockNumber;
    }
};
ConfirmWithdrawProcessedHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __param(1, (0, common_1.Inject)("InternalBlockchain")),
    __param(4, (0, common_1.Inject)("NotifierInterface")),
    __metadata("design:paramtypes", [Object, InternalBlockchain_1.default,
        AssetNormalizer_1.default,
        Setting_1.default, Object])
], ConfirmWithdrawProcessedHandler);
exports.default = ConfirmWithdrawProcessedHandler;
//# sourceMappingURL=ConfirmWithdrawProcessedHandler.js.map