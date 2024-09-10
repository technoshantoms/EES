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
const SubmitWithdrawRequest_1 = __importDefault(require("../../Context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequest"));
const SubmitWithdrawRequestHandler_1 = __importDefault(require("../../Context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler"));
let SubmitWithdrawRequestController = class SubmitWithdrawRequestController {
    constructor(_submitWithdrawRequestHandler) {
        this._submitWithdrawRequestHandler = _submitWithdrawRequestHandler;
    }
    async create(request) {
        const command = new SubmitWithdrawRequest_1.default(request.rsquaredAccount, request.amountToPayInRQETH, request.addressOfUserInEthereum, request.withdrawalFeeAmount, request.withdrawalFeeCurrency);
        try {
            const withdrawRequestId = await this._submitWithdrawRequestHandler.execute(command);
            return Promise.resolve(SuccessResponse_1.default.create({
                id: withdrawRequestId,
            }));
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubmitWithdrawRequestController.prototype, "create", null);
SubmitWithdrawRequestController = __decorate([
    (0, common_1.Controller)("withdraw"),
    __metadata("design:paramtypes", [SubmitWithdrawRequestHandler_1.default])
], SubmitWithdrawRequestController);
exports.default = SubmitWithdrawRequestController;
//# sourceMappingURL=SubmitWithdrawRequestController.js.map