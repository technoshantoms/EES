import { DomainError } from "context/Core/Domain/DomainError";
export declare class ReadyToProcessError extends DomainError {
    constructor(id: string, status: number);
}
export declare class CreateWithdrawExternalContractStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class InvalidTimelockError extends DomainError {
    constructor(id: string);
}
export declare class SendInReplyStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class ReadyToSignStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class RedeemError extends DomainError {
    constructor(id: string, status: number);
}
export declare class RedeemedError extends DomainError {
    constructor(id: string, status: number);
}
export declare class ProcessedError extends DomainError {
    constructor(id: string, status: number);
}
