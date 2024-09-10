"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundUnexpectedError = exports.CreateWithdrawContractUnexpactedError = exports.ErrorEstimatingGas = exports.RedeemUnexpectedError = exports.ConnectionError = exports.ExternalBlockchainError = void 0;
class ExternalBlockchainError extends Error {
}
exports.ExternalBlockchainError = ExternalBlockchainError;
class ConnectionError extends ExternalBlockchainError {
    constructor() {
        super("External blockchain connection error");
    }
}
exports.ConnectionError = ConnectionError;
class RedeemUnexpectedError extends ExternalBlockchainError {
    constructor(contractId, message) {
        super(`Error while redeem contract ${contractId}: ${message}`);
    }
}
exports.RedeemUnexpectedError = RedeemUnexpectedError;
class ErrorEstimatingGas extends ExternalBlockchainError {
    constructor(receiver, message) {
        super(`Error while estimating gas for receiver ${receiver}: ${message}`);
    }
}
exports.ErrorEstimatingGas = ErrorEstimatingGas;
class CreateWithdrawContractUnexpactedError extends ExternalBlockchainError {
    constructor(receiver, message) {
        super(`Error while creating new contract for receiver ${receiver}: ${message}`);
    }
}
exports.CreateWithdrawContractUnexpactedError = CreateWithdrawContractUnexpactedError;
class RefundUnexpectedError extends ExternalBlockchainError {
    constructor(contractId, message) {
        super(`Error while refund contract ${contractId}: ${message}`);
    }
}
exports.RefundUnexpectedError = RefundUnexpectedError;
//# sourceMappingURL=Errors.js.map