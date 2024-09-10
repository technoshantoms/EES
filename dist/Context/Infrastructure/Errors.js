"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalBlockchainConnectionError = exports.ExternalBlockchainConnectionError = exports.DatabaseConnectionError = void 0;
class InfrastructureError extends Error {
}
class DatabaseConnectionError extends InfrastructureError {
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class ExternalBlockchainConnectionError extends InfrastructureError {
}
exports.ExternalBlockchainConnectionError = ExternalBlockchainConnectionError;
class InternalBlockchainConnectionError extends InfrastructureError {
}
exports.InternalBlockchainConnectionError = InternalBlockchainConnectionError;
//# sourceMappingURL=Errors.js.map