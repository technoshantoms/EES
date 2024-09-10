import { UseCaseError } from "../../../../Core/Logic/AppError";
export declare class SessionNotFoundError extends UseCaseError {
    constructor(id: string);
}
export declare class SessionAlreadyPaid extends UseCaseError {
    constructor(id: string);
}
export declare class TransactionNotFound extends UseCaseError {
    constructor(txHash: string);
}
export declare class InvalidHashLock extends UseCaseError {
    constructor(txHash: string);
}
