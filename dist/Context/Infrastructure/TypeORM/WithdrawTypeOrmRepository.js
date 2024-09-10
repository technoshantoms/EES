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
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const Withdraw_1 = __importStar(require("../../Domain/Withdraw"));
const WithdrawRequest_1 = __importDefault(require("../../Domain/WithdrawRequest"));
const InternalContract_1 = __importDefault(require("../../Domain/InternalContract"));
const ExternalContract_1 = __importDefault(require("../../Domain/ExternalContract"));
let WithdrawTypeOrmRepository = class WithdrawTypeOrmRepository {
    constructor(_datasource) {
        this._datasource = _datasource;
    }
    async save(withdraw) {
        if (withdraw.withdrawRequest) {
            const withdrawRequestRepository = this._datasource.getRepository(WithdrawRequest_1.default);
            await withdrawRequestRepository.upsert(withdraw.withdrawRequest, ["idString"]);
        }
        if (withdraw.internalContract) {
            const internalContractRepository = await this._datasource.getRepository(InternalContract_1.default);
            await internalContractRepository.upsert(withdraw.internalContract, ["idString"]);
        }
        if (withdraw.externalContract) {
            const externalContractRepository = await this._datasource.getRepository(ExternalContract_1.default);
            await externalContractRepository.upsert(withdraw.externalContract, ["idString"]);
        }
        await this._datasource.getRepository(Withdraw_1.default).upsert(withdraw, ["id"]);
    }
    async getAllForCheck() {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw.status = :status", { status: Withdraw_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN })
            .getMany();
    }
    async getById(id) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw.id = :withdrawId", { withdrawId: id })
            .getOne();
    }
    async getByTxHash(txHash) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw.txHash = :withdrawTxHash", { withdrawTxHash: txHash })
            .getOne();
    }
    async getByRequestId(requestId) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdrawRequest.id = :requestId", { requestId: requestId })
            .getOne();
    }
    async getByRedeemTxHash(txHash) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw._externalBlockchainRedeemTxHash = :txHash", { txHash })
            .getOne();
    }
    async getByExternalContractId(contractId) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("externalContract.id = :contractId", { contractId })
            .getOne();
    }
    async getByRedeemStatus() {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .where("withdraw.status = :status", { status: Withdraw_1.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN })
            .getMany();
    }
    async getByInternalContractId(contractId) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("internalContract.internalId = :contractId", { contractId })
            .getOne();
    }
    async getAllRedeemed() {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw.status = :status", { status: Withdraw_1.STATUS_REDEEMED })
            .getMany();
    }
    async getAllReadyToRefund() {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .where("withdraw.status = :status", { status: Withdraw_1.STATUS_READY_TO_SIGN })
            .andWhere("externalContract.time_lock <= NOW()")
            .getMany();
    }
    async getByRefundTxHash(txHash) {
        return await this._datasource
            .getRepository(Withdraw_1.default)
            .createQueryBuilder("withdraw")
            .leftJoinAndSelect("withdraw.externalContract", "externalContract")
            .leftJoinAndSelect("withdraw.internalContract", "internalContract")
            .leftJoinAndSelect("withdraw.withdrawRequest", "withdrawRequest")
            .where("withdraw._externalBlockchainRefundTxHash = :txHash", { txHash })
            .getOne();
    }
};
WithdrawTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DataSource")),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], WithdrawTypeOrmRepository);
exports.default = WithdrawTypeOrmRepository;
//# sourceMappingURL=WithdrawTypeOrmRepository.js.map