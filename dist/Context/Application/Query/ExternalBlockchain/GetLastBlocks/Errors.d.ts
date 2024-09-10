import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class BlockNotExists extends UseCaseError {
    constructor(number: number);
}
export declare class FromBlockLargerThanToBlock extends UseCaseError {
    constructor(fromBlockNumber: number, toBlockNumber: number);
}
export declare class FromBlockHashEqualsToBlockHash extends UseCaseError {
    constructor(hash: string, number: number);
}
