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
const dayjs_1 = __importDefault(require("dayjs"));
const web3_1 = __importDefault(require("web3"));
const constants_1 = require("@ethersproject/constants");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DepositExternalContractValidator extends AbstractValidator_1.default {
    constructor(externalContract) {
        super();
        this.externalContract = externalContract;
    }
    validate() {
        this.validateReceiver();
        this.validateSender();
        this.validateValue();
        this.validateWithdrawn();
        this.validateRefunded();
        this.validatePreimage();
    }
    validateReceiver() {
        if (this.externalContract.receiver !== config_1.default.eth.receiver) {
            throw new Errors.ReceiverIsInvalid();
        }
    }
    validateTimeLock() {
        const timeLockLimit = (0, dayjs_1.default)().add(config_1.default.contract.minimum_timelock, "minutes");
        if (this.externalContract.timeLock < timeLockLimit.unix()) {
            throw new Errors.TimeLockIsToSmall(dayjs_1.default.unix(this.externalContract.timeLock).format(), timeLockLimit.format());
        }
    }
    validateValue() {
        const contractValue = web3_1.default.utils.toBN(this.externalContract.value);
        if (contractValue.cmp(config_1.default.eth.minimum_deposit_amount) < 0) {
            throw new Errors.DepositIsToSmall(config_1.default.eth.minimum_deposit_amount.toString(), contractValue.toString());
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
    validateSender() {
        const sanctionedAddresses = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../../../src/assets/SanctionedAddresses/', 'sanctioned_addresses_ETH.json'), 'utf8'));
        if (sanctionedAddresses.includes(this.externalContract.sender)) {
            throw new Errors.SenderIsSanctioned();
        }
    }
}
exports.default = DepositExternalContractValidator;
//# sourceMappingURL=DepositExternalContractValidator.js.map