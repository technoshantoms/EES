export declare class Result<T> {
    isSuccess: boolean;
    isFailure: boolean;
    error: T | string | null;
    private readonly _value;
    constructor(isSuccess: boolean, error: T | string | null, value?: T | null);
    getValue(): T | null;
    static ok<U>(value?: U | null): Result<U>;
    static fail<U>(error: any): Result<U>;
    static combine(results: Result<any>[]): Result<any>;
}
export type Either<L, A> = Left<L, A> | Right<L, A>;
export declare class Left<L, A> {
    readonly value: L;
    constructor(value: L);
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
}
export declare class Right<L, A> {
    readonly value: A;
    constructor(value: A);
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
}
export declare const left: <L, A>(l: L) => Either<L, A>;
export declare const right: <L, A>(a: A) => Either<L, A>;
