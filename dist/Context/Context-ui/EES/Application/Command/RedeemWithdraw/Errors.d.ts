import { UseCaseError } from "../../../../Core/Logic/AppError";
export declare class SessionNotFoundError extends UseCaseError {
    constructor(id: string);
}
export declare class InvalidSessionStatusError extends UseCaseError {
    constructor(id: string);
}
export declare class ExternalBlockchainError extends UseCaseError {
}
