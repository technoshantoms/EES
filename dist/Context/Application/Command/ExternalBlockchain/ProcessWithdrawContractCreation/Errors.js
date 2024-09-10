"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalContractNotExists = exports.DepositRequestNotExists = exports.WithdrawNotExists = exports.TransactionNotFoundInBlockchain = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class TransactionNotFoundInBlockchain extends UseCaseError_1.UseCaseError {
    constructor(hash) {
        super(`The transaction with hash "${hash}" was not found in blockchain.`);
    }
}
exports.TransactionNotFoundInBlockchain = TransactionNotFoundInBlockchain;
class WithdrawNotExists extends UseCaseError_1.UseCaseError {
    constructor(txHash) {
        super(`The withdraw with txHash "${txHash}" not exists.`);
    }
}
exports.WithdrawNotExists = WithdrawNotExists;
class DepositRequestNotExists extends UseCaseError_1.UseCaseError {
    constructor(hashLock) {
        super(`The deposit request with hashLock "${hashLock}" is not exists.`);
    }
}
exports.DepositRequestNotExists = DepositRequestNotExists;
class ExternalContractNotExists extends UseCaseError_1.UseCaseError {
    constructor(contractId) {
        super(`The external contract "${contractId}" is not exists in the blockchain.`);
    }
}
exports.ExternalContractNotExists = ExternalContractNotExists;
//# sourceMappingURL=Errors.js.map