import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class BlockIsReversible extends UseCaseError {
    constructor(txHash: string);
}
