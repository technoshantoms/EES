export declare class AppError extends Error {
    private _error;
    constructor(_error: unknown);
    get error(): unknown;
    get message(): string;
    static create(err: Error): AppError;
}
export declare class BlockchainConnectionError extends Error {
    constructor();
}
export declare class WalletConnectionError extends Error {
}
export declare class EesConnectionError extends Error {
    constructor();
}
export declare class UseCaseError extends Error {
    constructor(message: string);
}
