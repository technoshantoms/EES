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
const Errors = __importStar(require("./Errors"));
const Setting_1 = __importStar(require("../../../../Setting/Setting"));
const dayjs_1 = __importDefault(require("dayjs"));
const process = __importStar(require("process"));
let ConfirmDepositExternalContractRedeemedHandler = class ConfirmDepositExternalContractRedeemedHandler {
    constructor(depositRepository, blockchainRepository, notifier, setting) {
        this.depositRepository = depositRepository;
        this.blockchainRepository = blockchainRepository;
        this.notifier = notifier;
        this.setting = setting;
    }
    async execute(command) {
        var _a;
        const deposit = await this.depositRepository.getByRedeemTxHash(command.txHash);
        if (deposit === null) {
            throw new Errors.DepositNotExists(command.txHash);
        }
        let receipt;
        try {
            receipt = await this.blockchainRepository.getTransactionReceipt(command.txHash);
        }
        catch (e) {
            const alertPeriod = parseInt(await this.setting.load(Setting_1.EXTERNAL_REDEEM_ALERT_THRESHOLD_TIMEOUT, "86400"));
            const alertDate = (0, dayjs_1.default)().add(alertPeriod, "seconds");
            if (deposit._externalContract.timeLock.value.isBefore(alertDate)) {
                await this.notifier.sendMessage("Timeout of HTLC Redeem in Ethereum");
            }
            throw e;
        }
        const blocksDifference = (await this.blockchainRepository.getLastBlockNumber()) - receipt.blockNumber;
        const ethRequiredBlockConfirmations = parseInt((_a = process.env.ETH_REQUIRED_BLOCK_CONFIRMATIONS) !== null && _a !== void 0 ? _a : "10");
        if (blocksDifference <= ethRequiredBlockConfirmations) {
            throw new Errors.ReversibleReceipt(String(receipt.blockNumber));
        }
        deposit.completed();
        this.depositRepository.save(deposit);
    }
};
ConfirmDepositExternalContractRedeemedHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __param(1, (0, common_1.Inject)("ExternalBlockchainRepositoryInterface")),
    __param(2, (0, common_1.Inject)("NotifierInterface")),
    __metadata("design:paramtypes", [Object, Object, Object, Setting_1.default])
], ConfirmDepositExternalContractRedeemedHandler);
exports.default = ConfirmDepositExternalContractRedeemedHandler;
//# sourceMappingURL=ConfirmDepositExternalContractRedeemedHandler.js.map