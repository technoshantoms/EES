import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class PersistentError extends UseCaseError {
}
export declare class WithdrawNotExists extends PersistentError {
    constructor(id: string);
}
export declare class ValidationError extends PersistentError {
}
