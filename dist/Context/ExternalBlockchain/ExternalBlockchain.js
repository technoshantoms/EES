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
const EthereumRepository_1 = __importDefault(require("./Repository/EthereumRepository"));
const StubRepository_1 = __importDefault(require("./Repository/StubRepository"));
const common_1 = require("@nestjs/common");
const config_1 = __importDefault(require("../config"));
let ExternalBlockchain = class ExternalBlockchain {
    constructor(repository) {
        this._repository = this.createRepository(repository);
    }
    get repository() {
        if (!this._repository) {
            throw new Error("Repository is not initialized");
        }
        return this._repository;
    }
    createRepository(repository) {
        switch (repository) {
            case "ethereum":
                return new EthereumRepository_1.default();
            case "stub":
                return new StubRepository_1.default();
            default:
                throw new Error("External repository invalid");
        }
    }
    async redeem(contractId, secret) {
        return this._repository.redeem(contractId, secret, config_1.default.eth.receiver);
    }
    getAsset() {
        return this._repository.getAsset();
    }
    async getGasPrice() {
        return await this._repository.getGasPrice();
    }
    async createWithdrawHTLC(receiver, hashlock, timelock, amount) {
        return await this._repository.createWithdrawHTLC(receiver, hashlock, timelock, amount);
    }
    async loadWithdrawContract(txHash, contractId) {
        return await this._repository.loadWithdrawContract(txHash, contractId);
    }
    async refund(contractId) {
        return await this._repository.refund(contractId);
    }
    async getFee() {
        return await this._repository.getFee();
    }
};
ExternalBlockchain = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("ExternalBlockchainRepositoryName")),
    __metadata("design:paramtypes", [String])
], ExternalBlockchain);
exports.default = ExternalBlockchain;
//# sourceMappingURL=ExternalBlockchain.js.map