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
const Errors = __importStar(require("./Errors"));
const config_1 = __importDefault(require("../../../../config"));
const AssetNormalizer_1 = __importDefault(require("../../../../Infrastructure/AssetNormalizer"));
const Errors_1 = require("./Errors");
let CheckInternalWithdrawalOperationHandler = class CheckInternalWithdrawalOperationHandler {
    constructor(withdrawRepository, withdrawRequestRepository, internalBlockchain, normalizer, RQETHAssetSymbol) {
        this.withdrawRepository = withdrawRepository;
        this.withdrawRequestRepository = withdrawRequestRepository;
        this.internalBlockchain = internalBlockchain;
        this.normalizer = normalizer;
        this.RQETHAssetSymbol = RQETHAssetSymbol;
        this.lastIrreversibleBlockNumber = undefined;
    }
    async execute(command) {
        this.lastIrreversibleBlockNumber = undefined;
        try {
            const htlcOperation = await this.internalBlockchain.getObject(command.withdraw.htlcCreateOperationId);
            await this.checkHTLCOperation(htlcOperation, command.withdraw);
            const transferOperation = await this.internalBlockchain.getObject(command.withdraw.transferOperationId);
            await this.checkTransferOperation(transferOperation, command.withdraw);
            command.withdraw.readyToProcess(htlcOperation.get("op")[1].preimage_hash[1], htlcOperation.get("op")[1].claim_period_seconds, htlcOperation.get("op")[1].amount.amount, transferOperation.get("op")[1].amount.amount, transferOperation.get("op")[1].amount.asset_id);
            await this.withdrawRepository.save(command.withdraw);
        }
        catch (error) {
            if (error instanceof Errors_1.HardFailError) {
                command.withdraw.error(error.message);
                await this.withdrawRepository.save(command.withdraw);
            }
            else {
                throw error;
            }
        }
    }
    async checkHTLCOperation(htlcOperation, withdraw) {
        if (!htlcOperation) {
            throw new Errors.HTLCCreateOperationNotFound(withdraw);
        }
        await this.checkLastIrreversible(htlcOperation);
        await this.checkReceiver(htlcOperation);
        const normalizedAmount = this.normalizer.normalize(htlcOperation.get("op")[1].amount.amount, await this.internalBlockchain.getAsset(htlcOperation.get("op")[1].amount.asset_id));
        if (normalizedAmount < config_1.default.eth.minimum_withdraw_amount) {
            throw new Errors.InvalidAmount(withdraw);
        }
        const asset = await this.internalBlockchain.getAsset(this.RQETHAssetSymbol);
        if (htlcOperation.get("op")[1].amount.asset_id != asset.get("id")) {
            throw new Errors.InvalidAsset(withdraw);
        }
        if (htlcOperation.get("op")[1].claim_period_seconds < config_1.default.contract.withdraw_internal_timelock) {
            throw new Errors.InvalidTimelock(withdraw);
        }
        if (!htlcOperation.get("op")[1].preimage_hash[1]) {
            throw new Errors.InvalidHashlock(withdraw);
        }
        if (htlcOperation.get("op")[1].preimage) {
            throw new Errors.InvalidPreimage(withdraw);
        }
    }
    async checkTransferOperation(transferOperation, withdraw) {
        await this.checkLastIrreversible(transferOperation);
        await this.checkReceiver(transferOperation);
        let minimalWithdrawalFee = config_1.default.r_squared.rqeth_withdrawal_fee;
        if (transferOperation.get("op")[1].amount.asset_id == config_1.default.r_squared.asset_id) {
            minimalWithdrawalFee = config_1.default.r_squared.rqrx_withdrawal_fee;
        }
        if (transferOperation.get("op")[1].amount.amount < minimalWithdrawalFee) {
            throw new Errors.InvalidWithdrawalFee(withdraw);
        }
    }
    async checkLastIrreversible(operation) {
        if (!this.lastIrreversibleBlockNumber) {
            this.lastIrreversibleBlockNumber = await this.internalBlockchain.getLastIrreversibleBlockNumber();
        }
        if (operation.get("block_num") > this.lastIrreversibleBlockNumber) {
            throw new Errors.BlockIsReversible(operation.get("id"));
        }
    }
    async checkReceiver(operation) {
        if (!this.eesAccountId) {
            this.eesAccountId = (await this.internalBlockchain.getEesAccount()).get("id");
        }
        if (operation.get("op")[1].to != this.eesAccountId) {
            throw new Errors.InvalidReceiver(operation.get("id"));
        }
    }
};
CheckInternalWithdrawalOperationHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __param(1, (0, common_1.Inject)("WithdrawRequestRepositoryInterface")),
    __param(2, (0, common_1.Inject)("InternalBlockchain")),
    __param(4, (0, common_1.Inject)("RQETHAssetSymbol")),
    __metadata("design:paramtypes", [Object, Object, InternalBlockchain_1.default,
        AssetNormalizer_1.default, String])
], CheckInternalWithdrawalOperationHandler);
exports.default = CheckInternalWithdrawalOperationHandler;
//# sourceMappingURL=CheckInternalWithdrawalOperationHandler.js.map