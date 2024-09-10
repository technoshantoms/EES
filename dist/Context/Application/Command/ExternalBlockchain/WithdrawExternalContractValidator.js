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
const AbstractValidator_1 = __importDefault(require("../../../Domain/Validation/AbstractValidator"));
const config_1 = __importDefault(require("../../../config"));
const Errors = __importStar(require("../../../Domain/Errors"));
const constants_1 = require("@ethersproject/constants");
class WithdrawExternalContractValidator extends AbstractValidator_1.default {
    constructor(externalContract) {
        super();
        this.externalContract = externalContract;
    }
    validate() {
        this.validateSender();
        this.validateValue();
        this.validateWithdrawn();
        this.validateRefunded();
        this.validatePreimage();
    }
    validateSender() {
        if (this.externalContract.sender !== config_1.default.eth.receiver) {
            throw new Errors.SenderIsInvalid();
        }
    }
    validateValue() {
        const contractValue = parseFloat(this.externalContract.value);
        if (contractValue < config_1.default.eth.minimum_withdraw_amount) {
            throw new Errors.DepositIsToSmall(config_1.default.eth.minimum_withdraw_amount.toString(), contractValue.toString());
        }
    }
    validateWithdrawn() {
        if (this.externalContract.withdrawn) {
            throw new Errors.AlreadyWithdrawn();
        }
    }
    validateRefunded() {
        if (this.externalContract.refunded) {
            throw new Errors.AlreadyRefunded();
        }
    }
    validatePreimage() {
        if (this.externalContract.preimage !== constants_1.HashZero) {
            throw new Errors.PreimageNotEmpty();
        }
    }
}
exports.default = WithdrawExternalContractValidator;
//# sourceMappingURL=WithdrawExternalContractValidator.js.map