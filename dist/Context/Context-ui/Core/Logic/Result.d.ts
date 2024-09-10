import { AppError, BlockchainConnectionError, EesConnectionError, UseCaseError } from "./AppError";
import { DomainError } from "../Domain/DomainError";
type ErrorsType = AppError | DomainError | UseCaseError | BlockchainConnectionError | EesConnectionError;
export type Result<F, S> = Failure<F> | Success<S>;
export type Either<F, S> = Failure<F> | Success<S>;
export declare class Success<T> {
    private readonly _value;
    constructor(value: T);
    get value(): T;
    isFailure(): this is Failure<T>;
    isSuccess(): this is Success<T>;
    static create<T>(value: T): Success<T>;
}
export declare class Failure<T> {
    private readonly _error;
    constructor(value: ErrorsType);
    get error(): ErrorsType;
    isFailure(): this is Failure<T>;
    isSuccess(): this is Success<T>;
    static create<T>(error: ErrorsType): Failure<T>;
}
export {};
