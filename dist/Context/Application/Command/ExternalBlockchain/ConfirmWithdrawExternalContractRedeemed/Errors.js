"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractWithoutPreimage = exports.ContractNotFound = exports.ContractWithdrawnIsFalse = exports.ReversibleReceipt = exports.WithdrawNotExists = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class WithdrawNotExists extends UseCaseError_1.UseCaseError {
    constructor(contractId) {
        super(`The withdraw with external_blockchain_contract_id "${contractId}" not exists.`);
    }
}
exports.WithdrawNotExists = WithdrawNotExists;
class ReversibleReceipt extends UseCaseError_1.UseCaseError {
    constructor(blockNumber) {
        super(`Receipt from block number "${blockNumber}" is reversible`);
    }
}
exports.ReversibleReceipt = ReversibleReceipt;
class ContractWithdrawnIsFalse extends UseCaseError_1.UseCaseError {
    constructor(contractId) {
        super(`Contract ${contractId} is not withdrawn`);
    }
}
exports.ContractWithdrawnIsFalse = ContractWithdrawnIsFalse;
class ContractNotFound extends UseCaseError_1.UseCaseError {
    constructor(contractId, txHash) {
        super(`Contract ${contractId} with ${txHash} not found`);
    }
}
exports.ContractNotFound = ContractNotFound;
class ContractWithoutPreimage extends UseCaseError_1.UseCaseError {
    constructor(contractId) {
        super(`Contract ${contractId} without preimage`);
    }
}
exports.ContractWithoutPreimage = ContractWithoutPreimage;
//# sourceMappingURL=Errors.js.map