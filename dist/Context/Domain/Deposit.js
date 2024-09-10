"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_REFUNDED_IN_EXTERNAL_BLOCKCHAIN = exports.STATUS_REFUNDED = exports.STATUS_BURNED = exports.STATUS_COMPLETED = exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN = exports.STATUS_REDEEMED_IN_INTERNAL_BLOCKCHAIN = exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN = exports.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN = exports.STATUS_CREATED = void 0;
const AggregateRoot_1 = __importDefault(require("../Core/Domain/AggregateRoot"));
const IncomingContractProcessedEvent_1 = __importDefault(require("./Event/IncomingContractProcessedEvent"));
const IncomingContractRedeemedEvent_1 = __importDefault(require("./Event/IncomingContractRedeemedEvent"));
const CreateContractInInternalBlockchainValidator_1 = __importDefault(require("./Validation/CreateContractInInternalBlockchainValidator"));
const ConfirmDepositInternalContractCreatedValidator_1 = __importDefault(require("./Validation/ConfirmDepositInternalContractCreatedValidator"));
const ConfirmDepositInternalContractRedeemedValidator_1 = __importDefault(require("./Validation/ConfirmDepositInternalContractRedeemedValidator"));
const RedeemExecutedInExternalBlockchainValidator_1 = __importDefault(require("./Validation/RedeemExecutedInExternalBlockchainValidator"));
const CompletedValidator_1 = __importDefault(require("./Validation/CompletedValidator"));
const BurnedValidator_1 = __importDefault(require("./Validation/BurnedValidator"));
const RefundedValidator_1 = __importDefault(require("./Validation/RefundedValidator"));
exports.STATUS_CREATED = 1;
exports.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN = 5;
exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN = 10;
exports.STATUS_REDEEMED_IN_INTERNAL_BLOCKCHAIN = 15;
exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN = 20;
exports.STATUS_COMPLETED = 25;
exports.STATUS_BURNED = 100;
exports.STATUS_REFUNDED = 105;
exports.STATUS_REFUNDED_IN_EXTERNAL_BLOCKCHAIN = 110;
class Deposit extends AggregateRoot_1.default {
    constructor(_depositRequest, _externalContract) {
        super();
        this._depositRequest = _depositRequest;
        this._externalContract = _externalContract;
        this._secret = null;
        this._internalContract = null;
        this._externalBlockchainRedeemTxHash = null;
        this._internalBlockchainBurnTxHash = null;
        this._mintedAmount = null;
        this._burnedAmount = null;
        this._status = exports.STATUS_CREATED;
    }
    get internalContract() {
        return this._internalContract;
    }
    get status() {
        return this._status;
    }
    get secret() {
        return this._secret;
    }
    get externalBlockchainRedeemTxHash() {
        return this._externalBlockchainRedeemTxHash;
    }
    get internalBlockchainBurnTxHash() {
        return this._internalBlockchainBurnTxHash;
    }
    get mintedAmount() {
        var _a;
        return (_a = this._mintedAmount) !== null && _a !== void 0 ? _a : "";
    }
    get burnedAmount() {
        var _a;
        return (_a = this._burnedAmount) !== null && _a !== void 0 ? _a : "";
    }
    static create(depositRequest, externalContract) {
        const deposit = new Deposit(depositRequest, externalContract);
        deposit.addDomainEvent(new IncomingContractProcessedEvent_1.default(deposit.id.toValue()));
        return deposit;
    }
    submittedToInternalBlockchain(mintedAmount) {
        new CreateContractInInternalBlockchainValidator_1.default(this).validate();
        this._status = exports.STATUS_SUBMITTED_TO_INTERNAL_BLOCKCHAIN;
        this._mintedAmount = mintedAmount;
    }
    createdInInternalBlockchain(internalContract) {
        new ConfirmDepositInternalContractCreatedValidator_1.default(this).validate();
        this._internalContract = internalContract;
        this._status = exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN;
    }
    redeemedInInternalBlockchain(secret) {
        new ConfirmDepositInternalContractRedeemedValidator_1.default(this).validate();
        this._secret = secret;
        this._status = exports.STATUS_REDEEMED_IN_INTERNAL_BLOCKCHAIN;
        this.addDomainEvent(new IncomingContractRedeemedEvent_1.default(this.id.toValue()));
    }
    redeemExecutedInExternalBlockchain(txHash) {
        new RedeemExecutedInExternalBlockchainValidator_1.default(this).validate();
        this._externalBlockchainRedeemTxHash = txHash;
        this._status = exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN;
    }
    completed() {
        new CompletedValidator_1.default(this).validate();
        this._status = exports.STATUS_COMPLETED;
    }
    isSubmittedToInternalBlockchain() {
        return this._status === exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN;
    }
    burned(burnedAmount) {
        this._burnedAmount = burnedAmount;
        new BurnedValidator_1.default(this).validate();
        this._status = exports.STATUS_BURNED;
    }
    refunded(txHash) {
        new RefundedValidator_1.default(this).validate();
        this._internalBlockchainBurnTxHash = txHash;
        this._status = exports.STATUS_REFUNDED;
    }
    resetToCreated() {
        this._status = exports.STATUS_CREATED;
        this._mintedAmount = null;
    }
    refundedInExternalBlockchain() {
        this._status = exports.STATUS_REFUNDED_IN_EXTERNAL_BLOCKCHAIN;
    }
    isRefundedInExternalBlockchain() {
        return this._status === exports.STATUS_REFUNDED_IN_EXTERNAL_BLOCKCHAIN;
    }
}
exports.default = Deposit;
//# sourceMappingURL=Deposit.js.map