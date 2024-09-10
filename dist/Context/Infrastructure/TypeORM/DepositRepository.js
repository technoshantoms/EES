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
const Deposit_1 = __importStar(require("../../Domain/Deposit"));
const InternalContract_1 = __importDefault(require("../../Domain/InternalContract"));
const common_1 = require("@nestjs/common");
let TypeOrmRepository = class TypeOrmRepository {
    constructor(_datasource) {
        this._datasource = _datasource;
    }
    async create(deposit) {
        await this._datasource.getRepository(Deposit_1.default).save(deposit);
    }
    async save(deposit) {
        if (deposit.internalContract instanceof InternalContract_1.default) {
            await this._datasource
                .getRepository(InternalContract_1.default)
                .upsert(deposit.internalContract, ["idString"]);
        }
        await this._datasource.getRepository(Deposit_1.default).upsert(deposit, ["id"]);
    }
    async exists(contractId) {
        const count = await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .where("externalContract.id = :contractId", { contractId: contractId })
            .getCount();
        return count > 0;
    }
    async getById(id) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("deposit.id = :depositId", { depositId: id })
            .getOne();
    }
    async getByRequestId(requestId) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("depositRequest.id = :requestId", { requestId: requestId })
            .getOne();
    }
    async getByTxHash(txHash) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("externalContract._txHash = :txHash", { txHash })
            .getOne();
    }
    async getWaitingToRedeem() {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .where("deposit.status = :status", { status: Deposit_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN })
            .getMany();
    }
    async getByRedeemTxHash(txHash) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("deposit._externalBlockchainRedeemTxHash = :txHash", { txHash })
            .getOne();
    }
    async getByBurnTxHash(txHash) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("deposit._internalBlockchainBurnTxHash = :txHash", { txHash })
            .getOne();
    }
    async getOverdueTimeLock() {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .where("deposit.status in (:status1, :status2, :status3)", {
            status1: Deposit_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN,
            status2: Deposit_1.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN,
            status3: Deposit_1.STATUS_REFUNDED_IN_EXTERNAL_BLOCKCHAIN
        })
            .andWhere("externalContract._timeLock <= NOW()")
            .getMany();
    }
    async getBurned() {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .where("deposit.status = :status", {
            status: Deposit_1.STATUS_BURNED,
        })
            .getMany();
    }
    async getByContractId(contractId) {
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("externalContract.id = :contractId", { contractId: contractId })
            .getOne();
    }
    async getByRequestIds(requestIds) {
        if (requestIds.length === 0)
            return Promise.resolve([]);
        return await this._datasource
            .getRepository(Deposit_1.default)
            .createQueryBuilder("deposit")
            .leftJoinAndSelect("deposit._externalContract", "externalContract")
            .leftJoinAndSelect("deposit._internalContract", "internalContract")
            .leftJoinAndSelect("deposit._depositRequest", "depositRequest")
            .where("depositRequest.id in (:requestIds)", { requestIds: requestIds })
            .getMany();
    }
};
TypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DataSource")),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmRepository);
exports.default = TypeOrmRepository;
//# sourceMappingURL=DepositRepository.js.map