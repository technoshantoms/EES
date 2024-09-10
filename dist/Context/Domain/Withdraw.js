"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_FAILED_PROCESSING = exports.STATUS_REFUNDED = exports.STATUS_REFUND = exports.STATUS_PROCESSED = exports.STATUS_REDEEMED = exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN = exports.STATUS_READY_TO_SIGN = exports.STATUS_SEND_IN_REPLY = exports.STATUS_READY_TO_PROCESS = exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN = void 0;
const AggregateRoot_1 = __importDefault(require("../Core/Domain/AggregateRoot"));
const ReadyToProcess_1 = __importDefault(require("./Validation/Withdraw/ReadyToProcess"));
const WithdrawReadyToProcessEvent_1 = __importDefault(require("./Event/WithdrawReadyToProcessEvent"));
const SendInReply_1 = __importDefault(require("./Validation/Withdraw/SendInReply"));
const ReadyToSign_1 = __importDefault(require("./Validation/Withdraw/ReadyToSign"));
const WithdrawRedeemed_1 = __importDefault(require("./Validation/Withdraw/WithdrawRedeemed"));
const WithdrawRedeem_1 = __importDefault(require("./Validation/Withdraw/WithdrawRedeem"));
const WithdrawProcesed_1 = __importDefault(require("./Validation/Withdraw/WithdrawProcesed"));
const WithdrawRefund_1 = __importDefault(require("./Validation/Withdraw/WithdrawRefund"));
const WithdrawRefunded_1 = __importDefault(require("./Validation/Withdraw/WithdrawRefunded"));
exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN = 5;
exports.STATUS_READY_TO_PROCESS = 10;
exports.STATUS_SEND_IN_REPLY = 15;
exports.STATUS_READY_TO_SIGN = 20;
exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN = 25;
exports.STATUS_REDEEMED = 30;
exports.STATUS_PROCESSED = 35;
exports.STATUS_REFUND = 100;
exports.STATUS_REFUNDED = 105;
exports.STATUS_FAILED_PROCESSING = 200;
class Withdraw extends AggregateRoot_1.default {
    constructor(withdrawRequest, internalContract, htlcCreateOperationId, transferOperationId) {
        super();
        this.withdrawRequest = withdrawRequest;
        this.internalContract = internalContract;
        this.htlcCreateOperationId = htlcCreateOperationId;
        this.transferOperationId = transferOperationId;
        this.secret = null;
        this.externalContract = null;
        this.errorMessage = null;
        this.hashlock = null;
        this.timelock = null;
        this.amountOfHTLC = null;
        this.amountOfWithdrawalFee = null;
        this.assetOfWithdrawalFee = null;
        this.txHash = null;
        this.externalBlockchainRedeemTxHash = null;
        this.internalRedeemBlockNumber = null;
        this.externalBlockchainRefundTxHash = null;
        this.status = exports.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN;
    }
    static create(withdrawRequest, internalContract, htlcCreateOperationId, transferOperationId) {
        return new Withdraw(withdrawRequest, internalContract, htlcCreateOperationId, transferOperationId);
    }
    error(message) {
        this.status = exports.STATUS_FAILED_PROCESSING;
        this.errorMessage = message;
    }
    readyToProcess(hashlock, timelock, amountOfHtlc, amountOfWithdrawalFee, assetOfWithdrawalFee) {
        this.hashlock = hashlock;
        this.timelock = timelock;
        this.amountOfHTLC = amountOfHtlc;
        this.amountOfWithdrawalFee = amountOfWithdrawalFee;
        this.assetOfWithdrawalFee = assetOfWithdrawalFee;
        new ReadyToProcess_1.default(this).validate();
        this.status = exports.STATUS_READY_TO_PROCESS;
        this.addDomainEvent(new WithdrawReadyToProcessEvent_1.default(this.id.toValue()));
    }
    sentInReply(txHash) {
        this.txHash = txHash;
        new SendInReply_1.default(this).validate();
        this.status = exports.STATUS_SEND_IN_REPLY;
    }
    readyToSign(contract) {
        this.externalContract = contract;
        new ReadyToSign_1.default(this).validate();
        this.status = exports.STATUS_READY_TO_SIGN;
    }
    isReadyToSign() {
        return this.status == exports.STATUS_READY_TO_SIGN;
    }
    redeem(externalBlockchainRedeemTxHash, preimage) {
        this.externalBlockchainRedeemTxHash = externalBlockchainRedeemTxHash;
        this.secret = preimage !== null && preimage !== void 0 ? preimage : null;
        new WithdrawRedeem_1.default(this).validate();
        this.status = exports.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN;
    }
    redeemed() {
        new WithdrawRedeemed_1.default(this).validate();
        this.status = exports.STATUS_REDEEMED;
    }
    setInternalRedeemBlockNumber(blockNumber) {
        this.internalRedeemBlockNumber = blockNumber;
    }
    processed() {
        new WithdrawProcesed_1.default(this).validate();
        this.status = exports.STATUS_PROCESSED;
    }
    refund(txHash) {
        new WithdrawRefund_1.default(this).validate();
        this.externalBlockchainRefundTxHash = txHash;
        this.status = exports.STATUS_REFUND;
    }
    refunded() {
        new WithdrawRefunded_1.default(this).validate();
        this.status = exports.STATUS_REFUNDED;
    }
}
exports.default = Withdraw;
//# sourceMappingURL=Withdraw.js.map