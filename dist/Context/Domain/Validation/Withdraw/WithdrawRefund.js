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
const Withdraw_1 = require("../../Withdraw");
const Errors = __importStar(require("./Errors"));
class WithdrawRefund extends AbstractValidator_1.default {
    constructor(withdraw) {
        super();
        this.withdraw = withdraw;
    }
    validate() {
        this.validateStatus();
    }
    validateStatus() {
        if (this.withdraw.status !== Withdraw_1.STATUS_SEND_IN_REPLY &&
            this.withdraw.status !== Withdraw_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN &&
            this.withdraw.status !== Withdraw_1.STATUS_READY_TO_PROCESS &&
            this.withdraw.status !== Withdraw_1.STATUS_READY_TO_SIGN) {
            throw new Errors.ProcessedError(this.withdraw.id.toValue(), this.withdraw.status);
        }
    }
}
exports.default = WithdrawRefund;
//# sourceMappingURL=WithdrawRefund.js.map