"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawTransactionsCollection = exports.OperationType = void 0;
const rsquared_js_1 = require("@r-squared/rsquared-js");
const WithdrawTransaction_1 = __importDefault(require("./WithdrawTransaction"));
var OperationType;
(function (OperationType) {
    OperationType[OperationType["Create"] = 0] = "Create";
    OperationType[OperationType["Redeem"] = 1] = "Redeem";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
class WithdrawTransactionsCollection {
    constructor(eesAccountId, operationType) {
        this.eesAccountId = eesAccountId;
        this.operationType = operationType;
        this._transactions = [];
    }
    get transactions() {
        return this._transactions;
    }
    add(operation) {
        if (this.isTransfer(operation) && this.operationType == OperationType.Create) {
            this.addTransferOperation(operation);
            return;
        }
        if (this.isHtlcCreate(operation) && this.operationType == OperationType.Create) {
            this.addHtlcCreateOperation(operation);
            return;
        }
        if (this.isHtlcRedeem(operation) && this.operationType == OperationType.Redeem) {
            this.addHtlcRedeemOperation(operation);
        }
    }
    isTransfer(operation) {
        if (operation.op[0] != rsquared_js_1.ChainTypes.operations.transfer) {
            return false;
        }
        if (operation.op[1].to != this.eesAccountId) {
            return false;
        }
        return true;
    }
    addTransferOperation(operation) {
        const transaction = this.getTransaction(operation);
        transaction.transactionInBlock = operation.trx_in_block;
        transaction.transferId = operation.id;
        transaction.blockNumber = operation.block_num;
        transaction.transferSender = operation.op[1].from;
        transaction.transferReceiver = operation.op[1].to;
    }
    isHtlcCreate(operation) {
        if (operation.op[0] != rsquared_js_1.ChainTypes.operations.htlc_create) {
            return false;
        }
        if (operation.op[1].to != this.eesAccountId) {
            return false;
        }
        return true;
    }
    isHtlcRedeem(operation) {
        if (operation.op[0] != rsquared_js_1.ChainTypes.operations.htlc_redeemed) {
            return false;
        }
        if (operation.op[1].to != this.eesAccountId) {
            return false;
        }
        return true;
    }
    addHtlcCreateOperation(operation) {
        const transaction = this.getTransaction(operation);
        transaction.transactionInBlock = operation.trx_in_block;
        transaction.denormalizedAmount = operation.op[1].amount.amount;
        transaction.blockNumber = operation.block_num;
        transaction.htlcCreateAssetId = operation.op[1].amount.asset_id;
        transaction.hashLock = operation.op[1].preimage_hash[1];
        transaction.hashMethod = operation.op[1].preimage_hash[0];
        transaction.htlcCreateId = operation.id;
        transaction.htlcId = operation.result[1];
        transaction.htlcCreateReceiver = operation.op[1].to;
        transaction.htlcCreateSender = operation.op[1].from;
        transaction.timeLock = operation.op[1].claim_period_seconds;
    }
    getTransaction(operation) {
        const lastTransaction = this._transactions.length > 0 ? this._transactions[this._transactions.length - 1] : null;
        const transactionId = operation.block_num + "_" + operation.trx_in_block;
        let transaction;
        if (lastTransaction && lastTransaction.transactionId == transactionId) {
            transaction = lastTransaction;
        }
        else {
            transaction = new WithdrawTransaction_1.default(transactionId);
            this._transactions.push(transaction);
        }
        return transaction;
    }
    addHtlcRedeemOperation(operation) {
        const transaction = this.getTransaction(operation);
        transaction.blockNumber = operation.block_num;
        transaction.htlcId = operation.op[1].htlc_id;
    }
}
exports.WithdrawTransactionsCollection = WithdrawTransactionsCollection;
//# sourceMappingURL=WithdrawTransactionsCollection.js.map