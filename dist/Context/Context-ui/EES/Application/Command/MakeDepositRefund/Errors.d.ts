import { UseCaseError } from "../../../../Core/Logic/AppError";
export declare class SessionNotFoundError extends UseCaseError {
    constructor(id: string);
}
export declare class SessionAlreadyRefundedError extends UseCaseError {
    constructor(id: string);
}
export declare class RefundUnexpectedError extends UseCaseError {
    constructor(id: string, error: any);
}
