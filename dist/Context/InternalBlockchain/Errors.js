"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectNotFound = exports.AccountNotFound = exports.CreateHtlcError = exports.ReserveAssetError = exports.IssueAssetError = exports.AssetNotFoundError = void 0;
class ExternalBlockchainError extends Error {
}
class AssetNotFoundError extends ExternalBlockchainError {
    constructor(asset) {
        super(`Asset ${asset} not found.`);
    }
}
exports.AssetNotFoundError = AssetNotFoundError;
class IssueAssetError extends ExternalBlockchainError {
    constructor() {
        super();
    }
}
exports.IssueAssetError = IssueAssetError;
class ReserveAssetError extends ExternalBlockchainError {
    constructor() {
        super();
    }
}
exports.ReserveAssetError = ReserveAssetError;
class CreateHtlcError extends ExternalBlockchainError {
    constructor() {
        super();
    }
}
exports.CreateHtlcError = CreateHtlcError;
class AccountNotFound extends ExternalBlockchainError {
    constructor(account) {
        super(`Account "${account}" is not found.`);
    }
}
exports.AccountNotFound = AccountNotFound;
class ObjectNotFound extends ExternalBlockchainError {
    constructor(id) {
        super(`Object "${id}" is not found.`);
    }
}
exports.ObjectNotFound = ObjectNotFound;
//# sourceMappingURL=Errors.js.map