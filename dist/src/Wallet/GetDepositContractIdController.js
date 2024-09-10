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
let GetDepositContractIdController = class GetDepositContractIdController {
    constructor(_repository) {
        this._repository = _repository;
    }
    async check(request) {
        var _a, _b;
        const deposit = await this._repository.getByRequestId(request.sessionId);
        if (!deposit) {
            throw new common_1.HttpException("Deposit not found", common_1.HttpStatus.NOT_FOUND);
        }
        return Promise.resolve(SuccessResponse_1.default.create({
            contractId: (_a = deposit._externalContract) === null || _a === void 0 ? void 0 : _a.idString,
            sender: (_b = deposit._externalContract) === null || _b === void 0 ? void 0 : _b.sender.value,
            refundedInExternalBlockchain: deposit.isRefundedInExternalBlockchain()
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
], GetDepositContractIdController.prototype, "check", null);
GetDepositContractIdController = __decorate([
    (0, common_1.Controller)("deposit/get-external-contract-id"),
    __param(0, (0, common_1.Inject)("DepositRepositoryInterface")),
    __metadata("design:paramtypes", [Object])
], GetDepositContractIdController);
exports.default = GetDepositContractIdController;
//# sourceMappingURL=GetDepositContractIdController.js.map