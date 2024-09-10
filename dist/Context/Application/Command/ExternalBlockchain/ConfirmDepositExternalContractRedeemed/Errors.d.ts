import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class DepositNotExists extends UseCaseError {
    constructor(redeemTxHash: string);
}
export declare class ReversibleReceipt extends UseCaseError {
    constructor(blockNumber: string);
}
