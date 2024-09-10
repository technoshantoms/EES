"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseError = exports.EesConnectionError = exports.WalletConnectionError = exports.BlockchainConnectionError = exports.AppError = void 0;
class AppError extends Error {
    constructor(_error) {
        super();
        this._error = _error;
    }
    get error() {
        return this._error;
    }
    get message() {
        return "An unexpected error occurred.";
    }
    static create(err) {
        return new AppError(err);
    }
}
exports.AppError = AppError;
class BlockchainConnectionError extends Error {
    constructor() {
        super("Blockchain connection error.");
    }
}
exports.BlockchainConnectionError = BlockchainConnectionError;
class WalletConnectionError extends Error {
}
exports.WalletConnectionError = WalletConnectionError;
class EesConnectionError extends Error {
    constructor() {
        super("EES services is unavailable.");
    }
}
exports.EesConnectionError = EesConnectionError;
class UseCaseError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UseCaseError = UseCaseError;
//# sourceMappingURL=AppError.js.map