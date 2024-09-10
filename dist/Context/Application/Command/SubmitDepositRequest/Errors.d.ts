import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class DepositRequestAlreadyExists extends UseCaseError {
    constructor(hashLock: string);
}
