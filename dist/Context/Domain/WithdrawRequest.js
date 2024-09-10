"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_WITHDRAW_CREATED = exports.STATUS_CREATED = void 0;
const AggregateRoot_1 = __importDefault(require("../Core/Domain/AggregateRoot"));
const Errors_1 = require("./Errors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.STATUS_CREATED = 1;
exports.STATUS_WITHDRAW_CREATED = 5;
class WithdrawRequest extends AggregateRoot_1.default {
    constructor(_nativeAccount, _amountToPayInRQETH, _addressOfUserInEthereum, _withdrawalFeeAmount, _withdrawalFeeCurrency) {
        super();
        this._nativeAccount = _nativeAccount;
        this._amountToPayInRQETH = _amountToPayInRQETH;
        this._addressOfUserInEthereum = _addressOfUserInEthereum;
        this._withdrawalFeeAmount = _withdrawalFeeAmount;
        this._withdrawalFeeCurrency = _withdrawalFeeCurrency;
        this._status = exports.STATUS_CREATED;
    }
    get nativeAccount() {
        return this._nativeAccount;
    }
    get amountToPayInRQETH() {
        return this._amountToPayInRQETH;
    }
    get addressOfUserInEthereum() {
        return this._addressOfUserInEthereum;
    }
    get status() {
        return this._status;
    }
    get withdrawalFeeAmount() {
        return this._withdrawalFeeAmount;
    }
    get withdrawalFeeCurrency() {
        return this._withdrawalFeeCurrency;
    }
    static create(nativeAccount, amountToPayInRQETH, addressOfUserInEthereum, withdrawalFeeAmount, withdrawalFeeCurrency) {
        if (amountToPayInRQETH <= 0) {
            throw new Errors_1.WithdrawRequestValidationError("Amount to pay in RQETH can not be negative or zero");
        }
        if (addressOfUserInEthereum.length === 0) {
            throw new Errors_1.WithdrawRequestValidationError("Address of user in Ethereum can not be empty");
        }
        const sanctionedAddresses = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../src/assets/SanctionedAddresses/', 'sanctioned_addresses_ETH.json'), 'utf8'));
        if (sanctionedAddresses.includes(addressOfUserInEthereum)) {
            throw new Errors_1.WithdrawRequestValidationError("Address of user in Ethereum is sanctioned");
        }
        if (withdrawalFeeAmount <= 0) {
            throw new Errors_1.WithdrawRequestValidationError("Withdrawal fee amount can not be negative or zero");
        }
        if (withdrawalFeeCurrency.length === 0) {
            throw new Errors_1.WithdrawRequestValidationError("Withdrawal fee currency can not be empty");
        }
        return new WithdrawRequest(nativeAccount, amountToPayInRQETH, addressOfUserInEthereum, withdrawalFeeAmount, withdrawalFeeCurrency);
    }
    withdrawCreated() {
        this._status = exports.STATUS_WITHDRAW_CREATED;
    }
}
exports.default = WithdrawRequest;
//# sourceMappingURL=WithdrawRequest.js.map