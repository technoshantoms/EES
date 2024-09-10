"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversibleReceipt = exports.DepositNotExists = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class DepositNotExists extends UseCaseError_1.UseCaseError {
    constructor(redeemTxHash) {
        super(`The deposit with external_blockchain_redeem_tx_hash "${redeemTxHash}" not exists.`);
    }
}
exports.DepositNotExists = DepositNotExists;
class ReversibleReceipt extends UseCaseError_1.UseCaseError {
    constructor(blockNumber) {
        super(`Receipt from block number "${blockNumber}" is reversible`);
    }
}
exports.ReversibleReceipt = ReversibleReceipt;
//# sourceMappingURL=Errors.js.map