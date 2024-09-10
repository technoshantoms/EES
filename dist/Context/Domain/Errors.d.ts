import { DomainError } from "../Core/Domain/DomainError";
import { UseCaseError } from "context/Core/Logic/UseCaseError";
import { Dayjs } from "dayjs";
export declare class CreateDepositUnexpectedError extends DomainError {
    constructor();
}
export declare class CreateDepositRequestUnexpectedError extends DomainError {
    constructor();
}
export declare class ValidationError extends DomainError {
}
export declare class NativeAccountValidationError extends ValidationError {
    private error;
    constructor(error: string, nativeAccount: string);
}
export declare class HashLockValidationError extends ValidationError {
    private error;
    constructor(error: string, hashLock: string);
}
export declare class TxHashValidationError extends ValidationError {
    private error;
    constructor(error: string, txHash: string);
}
export declare class AddressValidationError extends ValidationError {
    private error;
    constructor(error: string, address: string);
}
export declare class ReceiverIsInvalid extends UseCaseError {
    constructor();
}
export declare class SenderIsInvalid extends UseCaseError {
    constructor();
}
export declare class DepositIsToSmall extends UseCaseError {
    constructor(minValue: string, value: string);
}
export declare class TimeLockIsToSmall extends UseCaseError {
    constructor(contractTimeLock: string, minMinutes: string);
}
export declare class AlreadyWithdrawn extends UseCaseError {
    constructor();
}
export declare class AlreadyRefunded extends UseCaseError {
    constructor();
}
export declare class PreimageNotEmpty extends UseCaseError {
    constructor();
}
export declare class CreateContractInInternalBlockchainStatusError extends DomainError {
    constructor(status: number);
}
export declare class CreateContractInInternalBlockchainTimeLockError extends DomainError {
    constructor(externalContractTimeLock: Dayjs);
}
export declare class ConfirmDepositInternalContractCreatedStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class ConfirmDepositInternalContractRedeemedStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class RedeemExecutedInExternalBlockchainStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class CompletedStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class BurnedStatusError extends DomainError {
    constructor(id: string, status: number);
}
export declare class BurnedAmountError extends DomainError {
    constructor(id: string, burnedAmount: string, mintedAmount: string);
}
export declare class SenderIsSanctioned extends UseCaseError {
    constructor();
}
export declare class ReceiverIsSanctioned extends UseCaseError {
    constructor();
}
export declare class WithdrawRequestValidationError extends UseCaseError {
}
