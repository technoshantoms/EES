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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var InternalBlockchain_1;
Object.defineProperty(exports, "__esModule", { value: true });
const NativeRepository_1 = __importDefault(require("./Repository/NativeRepository"));
const StubRepository_1 = __importDefault(require("./Repository/StubRepository"));
const config_1 = __importDefault(require("../config"));
const common_1 = require("@nestjs/common");
let InternalBlockchain = InternalBlockchain_1 = class InternalBlockchain {
    constructor(_repository) {
        this._repository = _repository;
    }
    static async init(config) {
        const repository = await InternalBlockchain_1.createRepository(config.repository);
        return new InternalBlockchain_1(repository);
    }
    disconnect() {
        this._repository.disconnect();
    }
    static async createRepository(repository) {
        switch (repository) {
            case "native":
                return await NativeRepository_1.default.init(config_1.default.r_squared.node_url, config_1.default.r_squared.ees_account, config_1.default.r_squared.account_private_key, config_1.default.r_squared.rqeth_asset_symbol, config_1.default.r_squared.chain_id);
            case "stub":
                return new StubRepository_1.default();
            default:
                throw new Error("Internal repository invalid");
        }
    }
    get repository() {
        if (!this._repository) {
            throw new Error("Repository is not initialized");
        }
        return this._repository;
    }
    async createContract(externalId, accountToName, amount, hashLock, timeLock) {
        await this._repository.createContract(externalId, accountToName, amount, hashLock, timeLock);
    }
    async getIncomingContracts(start) {
        return await this._repository.getIncomingContracts(start);
    }
    async getRefundOperations(account) {
        return await this._repository.getRefundOperations(account);
    }
    async getRedeemOperations(account) {
        return await this._repository.getRedeemOperations(account);
    }
    async burnAsset(amount) {
        await this._repository.burnAsset(amount);
    }
    async getBurnOperations(account) {
        return await this._repository.getBurnOperations(account);
    }
    async getInternalAsset() {
        return await this._repository.getInternalAsset();
    }
    async getAsset(assetId) {
        return await this._repository.getAsset(assetId);
    }
    async getAccountHistory(lastProcessedAccountHistoryOperation) {
        return await this.repository.getAccountHistory(lastProcessedAccountHistoryOperation);
    }
    async getAccount(accountId) {
        return await this.repository.getAccount(accountId);
    }
    async getEesAccount() {
        return await this.repository.getEesAccount();
    }
    async getObject(objectId) {
        return await this.repository.getObject(objectId);
    }
    async getLastIrreversibleBlockNumber() {
        return await this.repository.getLastIrreversibleBlockNumber();
    }
    async withdrawRedeem(preimage, contractId, amount) {
        return await this.repository.withdrawRedeem(preimage, contractId, amount);
    }
};
InternalBlockchain = InternalBlockchain_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], InternalBlockchain);
exports.default = InternalBlockchain;
//# sourceMappingURL=InternalBlockchain.js.map