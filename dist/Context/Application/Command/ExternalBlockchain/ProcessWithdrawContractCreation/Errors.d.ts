import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class TransactionNotFoundInBlockchain extends UseCaseError {
    constructor(hash: string);
}
export declare class WithdrawNotExists extends UseCaseError {
    constructor(txHash: string);
}
export declare class DepositRequestNotExists extends UseCaseError {
    constructor(hashLock: string);
}
export declare class ExternalContractNotExists extends UseCaseError {
    constructor(contractId: string);
}
