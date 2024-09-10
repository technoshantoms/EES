import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class WithdrawNotFound extends UseCaseError {
    constructor(txHash: string);
}
export declare class WithdrawWithoutSecret extends UseCaseError {
    constructor(withdrawId: string);
}
