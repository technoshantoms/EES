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
const Context_1 = require("../../Context");
const SuccessResponse_1 = __importDefault(require("../Response/SuccessResponse"));
let SubmitDepositRequestController = class SubmitDepositRequestController {
    async create(request) {
        const command = new Context_1.SubmitDepositRequest(request.rsquaredAccount, request.hashLock);
        try {
            const depositRequestId = await Context_1.submitDepositRequestHandler.execute(command);
            return Promise.resolve(SuccessResponse_1.default.create({
                id: depositRequestId,
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
], SubmitDepositRequestController.prototype, "create", null);
SubmitDepositRequestController = __decorate([
    (0, common_1.Controller)("deposit")
], SubmitDepositRequestController);
exports.default = SubmitDepositRequestController;
//# sourceMappingURL=SubmitDepositRequestController.js.map