import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class WithdrawNotExists extends UseCaseError {
    constructor(contractId: string);
}
export declare class ReversibleReceipt extends UseCaseError {
    constructor(blockNumber: string);
}
export declare class ContractWithdrawnIsFalse extends UseCaseError {
    constructor(contractId: string);
}
export declare class ContractNotFound extends UseCaseError {
    constructor(contractId: string, txHash: string);
}
export declare class ContractWithoutPreimage extends UseCaseError {
    constructor(contractId: string);
}
