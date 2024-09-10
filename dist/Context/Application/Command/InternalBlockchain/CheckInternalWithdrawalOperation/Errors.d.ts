import { UseCaseError } from "context/Core/Logic/UseCaseError";
import Withdraw from "context/Domain/Withdraw";
export declare class HardFailError extends UseCaseError {
}
export declare class BlockIsReversible extends UseCaseError {
    constructor(operationId: string);
}
export declare class HTLCCreateOperationNotFound extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidReceiver extends HardFailError {
    constructor(operationId: string);
}
export declare class InvalidAmount extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidAsset extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidTimelock extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidHashlock extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidPreimage extends HardFailError {
    constructor(withdraw: Withdraw);
}
export declare class InvalidWithdrawalFee extends HardFailError {
    constructor(withdraw: Withdraw);
}
