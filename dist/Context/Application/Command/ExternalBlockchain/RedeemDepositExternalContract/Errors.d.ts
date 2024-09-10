import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class DepositNotExists extends UseCaseError {
    constructor(id: string);
}
