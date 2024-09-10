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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const SuccessResponse_1 = __importDefault(require("../Response/SuccessResponse"));
const config_1 = __importDefault(require("../../Context/config"));
let GetSettingsController = class GetSettingsController {
    async create() {
        return Promise.resolve(SuccessResponse_1.default.create({
            deposit_contract_address: config_1.default.eth.deposit_contract_address,
            withdraw_contract_address: config_1.default.eth.withdraw_contract_address,
            receiver_address: config_1.default.eth.receiver,
            minimum_deposit: config_1.default.eth.minimum_deposit_amount.toString(),
            minimum_withdraw: config_1.default.eth.minimum_withdraw_amount.toString(),
            minimum_timelock: config_1.default.contract.minimum_timelock,
            withdraw_timelock: config_1.default.contract.withdraw_internal_timelock,
            rqrx_withdrawal_fee: config_1.default.r_squared.rqrx_withdrawal_fee,
            rqeth_withdrawal_fee: config_1.default.r_squared.rqeth_withdrawal_fee,
            rqeth_asset_symbol: config_1.default.r_squared.rqeth_asset_symbol,
            rsquared_ees_account: config_1.default.r_squared.ees_account,
        }));
    }
};
__decorate([
    (0, common_1.Get)(""),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetSettingsController.prototype, "create", null);
GetSettingsController = __decorate([
    (0, common_1.Controller)("settings")
], GetSettingsController);
exports.default = GetSettingsController;
//# sourceMappingURL=GetSettingsController.js.map