import { UseCaseError } from "context/Core/Logic/UseCaseError";
export declare class DepositNotFound extends UseCaseError {
    constructor(depositId: string);
}
