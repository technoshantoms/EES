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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValidator_1 = __importDefault(require("./../AbstractValidator"));
const Errors = __importStar(require("./Errors"));
const Withdraw_1 = require("../../Withdraw");
const config_1 = __importDefault(require("../../../config"));
const dayjs_1 = __importDefault(require("dayjs"));
class CreateWithdrawExternalContractValidator extends AbstractValidator_1.default {
    constructor(withdraw) {
        super();
        this.withdraw = withdraw;
    }
    validate() {
        this.validateStatus();
        this.validateTimelock();
    }
    validateStatus() {
        if (this.withdraw.status !== Withdraw_1.STATUS_READY_TO_PROCESS) {
            throw new Errors.CreateWithdrawExternalContractStatusError(this.withdraw.id.toValue(), this.withdraw.status);
        }
    }
    validateTimelock() {
        const contractCreatedAt = (0, dayjs_1.default)(this.withdraw.internalContract.createdAt);
        const internalContractTimelockDifference = contractCreatedAt
            .add(config_1.default.contract.withdraw_internal_timelock, "minute")
            .diff((0, dayjs_1.default)(), "minute");
        const summaryTimelock = config_1.default.contract.withdraw_external_timelock + config_1.default.r_squared.redeem_timeframe;
        if (internalContractTimelockDifference < summaryTimelock) {
            throw new Errors.InvalidTimelockError(this.withdraw.id.toValue());
        }
    }
}
exports.default = CreateWithdrawExternalContractValidator;
//# sourceMappingURL=CreateWithdrawExternalContractValidator.js.map