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
let GetWithdrawExternalContractController = class GetWithdrawExternalContractController {
    constructor(_repository) {
        this._repository = _repository;
    }
    async check(request) {
        var _a;
        const withdraw = await this._repository.getByRequestId(request.sessionId);
        if (!withdraw) {
            throw new common_1.HttpException("Withdraw not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (!withdraw.isReadyToSign()) {
            throw new common_1.HttpException("Withdraw status is not Ready-To-Sign", common_1.HttpStatus.BAD_REQUEST);
        }
        return Promise.resolve(SuccessResponse_1.default.create({
            contractId: (_a = withdraw.externalContract) === null || _a === void 0 ? void 0 : _a.idString,
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
], GetWithdrawExternalContractController.prototype, "check", null);
GetWithdrawExternalContractController = __decorate([
    (0, common_1.Controller)("withdraw/get-external-contract-id"),
    __param(0, (0, common_1.Inject)("WithdrawRepositoryInterface")),
    __metadata("design:paramtypes", [Object])
], GetWithdrawExternalContractController);
exports.default = GetWithdrawExternalContractController;
//# sourceMappingURL=GetWithdrawExternalContractController.js.map