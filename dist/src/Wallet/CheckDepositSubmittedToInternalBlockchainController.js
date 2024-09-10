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
const common_1 = require("@nestjs/common");
const SuccessResponse_1 = __importDefault(require("../Response/SuccessResponse"));
let CheckDepositSubmittedToInternalBlockchainController = class CheckDepositSubmittedToInternalBlockchainController {
    constructor(_repository) {
        this._repository = _repository;
    }
    async create(request) {
        const deposit = await this._repository.getByRequestId(request.sessionId);
        if (!deposit) {
            throw new common_1.HttpException("Deposit not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (!deposit.isSubmittedToInternalBlockchain()) {
            throw new common_1.HttpException("Deposit Internal Contract is not confirmed", common_1.HttpStatus.BAD_REQUEST);
        }
        return Promise.resolve(SuccessResponse_1.default.create({
            submitted: true
        }));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckDepositSubmittedToInternalBlockchainController.prototype, "create", null);
CheckDepositSubmittedToInternalBlockchainController = __decorate([
    (0, common_1.Controller)('deposit/submitted'),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __metadata("design:paramtypes", [Object])
], CheckDepositSubmittedToInternalBlockchainController);
exports.default = CheckDepositSubmittedToInternalBlockchainController;
//# sourceMappingURL=CheckDepositSubmittedToInternalBlockchainController.js.map