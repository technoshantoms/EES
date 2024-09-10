declare class ExternalBlockchainError extends Error {
}
export declare class AssetNotFoundError extends ExternalBlockchainError {
    constructor(asset: string);
}
export declare class IssueAssetError extends ExternalBlockchainError {
    constructor();
}
export declare class ReserveAssetError extends ExternalBlockchainError {
    constructor();
}
export declare class CreateHtlcError extends ExternalBlockchainError {
    constructor();
}
export declare class AccountNotFound extends ExternalBlockchainError {
    constructor(account: string);
}
export declare class ObjectNotFound extends ExternalBlockchainError {
    constructor(id: string);
}
export {};
