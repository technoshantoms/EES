export declare class ExternalBlockchainError extends Error {
}
export declare class ConnectionError extends ExternalBlockchainError {
    constructor();
}
export declare class RedeemUnexpectedError extends ExternalBlockchainError {
    constructor(contractId: string, message: string);
}
export declare class ErrorEstimatingGas extends ExternalBlockchainError {
    constructor(receiver: string, message: string);
}
export declare class CreateWithdrawContractUnexpactedError extends ExternalBlockchainError {
    constructor(receiver: string, message: string);
}
export declare class RefundUnexpectedError extends ExternalBlockchainError {
    constructor(contractId: string, message: string);
}
