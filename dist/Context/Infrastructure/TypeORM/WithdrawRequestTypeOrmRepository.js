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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const WithdrawRequest_1 = __importStar(require("../../Domain/WithdrawRequest"));
const common_1 = require("@nestjs/common");
let WithdrawRequestTypeOrmRepository = class WithdrawRequestTypeOrmRepository {
    constructor(_datasource) {
        this._datasource = _datasource;
    }
    async create(withdrawRequest) {
        await this._datasource.getRepository(WithdrawRequest_1.default).save(withdrawRequest);
    }
    async findAllCreated() {
        return await this._datasource
            .getRepository(WithdrawRequest_1.default)
            .createQueryBuilder("withdraw_request")
            .where("withdraw_request.status = :status", { status: WithdrawRequest_1.STATUS_CREATED })
            .orderBy("withdraw_request.created_at", "DESC")
            .getMany();
    }
    async save(request) {
        await this._datasource.getRepository(WithdrawRequest_1.default).upsert(request, ["id"]);
    }
};
WithdrawRequestTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DataSource")),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], WithdrawRequestTypeOrmRepository);
exports.default = WithdrawRequestTypeOrmRepository;
//# sourceMappingURL=WithdrawRequestTypeOrmRepository.js.map