"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawRequestValidationError = exports.ReceiverIsSanctioned = exports.SenderIsSanctioned = exports.BurnedAmountError = exports.BurnedStatusError = exports.CompletedStatusError = exports.RedeemExecutedInExternalBlockchainStatusError = exports.ConfirmDepositInternalContractRedeemedStatusError = exports.ConfirmDepositInternalContractCreatedStatusError = exports.CreateContractInInternalBlockchainTimeLockError = exports.CreateContractInInternalBlockchainStatusError = exports.PreimageNotEmpty = exports.AlreadyRefunded = exports.AlreadyWithdrawn = exports.TimeLockIsToSmall = exports.DepositIsToSmall = exports.SenderIsInvalid = exports.ReceiverIsInvalid = exports.AddressValidationError = exports.TxHashValidationError = exports.HashLockValidationError = exports.NativeAccountValidationError = exports.ValidationError = exports.CreateDepositRequestUnexpectedError = exports.CreateDepositUnexpectedError = void 0;
const DomainError_1 = require("../Core/Domain/DomainError");
const UseCaseError_1 = require("../Core/Logic/UseCaseError");
class CreateDepositUnexpectedError extends DomainError_1.DomainError {
    constructor() {
        super("Create Deposit unexpected error");
    }
}
exports.CreateDepositUnexpectedError = CreateDepositUnexpectedError;
class CreateDepositRequestUnexpectedError extends DomainError_1.DomainError {
    constructor() {
        super("Create DepositRequest unexpected error");
    }
}
exports.CreateDepositRequestUnexpectedError = CreateDepositRequestUnexpectedError;
class ValidationError extends DomainError_1.DomainError {
}
exports.ValidationError = ValidationError;
class NativeAccountValidationError extends ValidationError {
    constructor(error, nativeAccount) {
        super(`Account name "${nativeAccount}" is invalid: ${error}`);
        this.error = error;
    }
}
exports.NativeAccountValidationError = NativeAccountValidationError;
class HashLockValidationError extends ValidationError {
    constructor(error, hashLock) {
        super(`HashLock "${hashLock}" is invalid: ${error}`);
        this.error = error;
    }
}
exports.HashLockValidationError = HashLockValidationError;
class TxHashValidationError extends ValidationError {
    constructor(error, txHash) {
        super(`Transaction hash "${txHash}" is invalid: ${error}`);
        this.error = error;
    }
}
exports.TxHashValidationError = TxHashValidationError;
class AddressValidationError extends ValidationError {
    constructor(error, address) {
        super(`Address "${address}" is invalid: ${error}`);
        this.error = error;
    }
}
exports.AddressValidationError = AddressValidationError;
class ReceiverIsInvalid extends UseCaseError_1.UseCaseError {
    constructor() {
        super("The receiver is invalid.");
    }
}
exports.ReceiverIsInvalid = ReceiverIsInvalid;
class SenderIsInvalid extends UseCaseError_1.UseCaseError {
    constructor() {
        super("The sender is invalid.");
    }
}
exports.SenderIsInvalid = SenderIsInvalid;
class DepositIsToSmall extends UseCaseError_1.UseCaseError {
    constructor(minValue, value) {
        super(`The deposit ${value} is to small. Minimum deposit is ${minValue}.`);
    }
}
exports.DepositIsToSmall = DepositIsToSmall;
class TimeLockIsToSmall extends UseCaseError_1.UseCaseError {
    constructor(contractTimeLock, minMinutes) {
        super(`TimeLock ${contractTimeLock} is to small. Minimum timeLock is ${minMinutes}.`);
    }
}
exports.TimeLockIsToSmall = TimeLockIsToSmall;
class AlreadyWithdrawn extends UseCaseError_1.UseCaseError {
    constructor() {
        super("Contract is already withdrawn.");
    }
}
exports.AlreadyWithdrawn = AlreadyWithdrawn;
class AlreadyRefunded extends UseCaseError_1.UseCaseError {
    constructor() {
        super("Contract is already refunded.");
    }
}
exports.AlreadyRefunded = AlreadyRefunded;
class PreimageNotEmpty extends UseCaseError_1.UseCaseError {
    constructor() {
        super("Preimage is not empty.");
    }
}
exports.PreimageNotEmpty = PreimageNotEmpty;
class CreateContractInInternalBlockchainStatusError extends DomainError_1.DomainError {
    constructor(status) {
        super(`Status ${status} is invalid.`);
    }
}
exports.CreateContractInInternalBlockchainStatusError = CreateContractInInternalBlockchainStatusError;
class CreateContractInInternalBlockchainTimeLockError extends DomainError_1.DomainError {
    constructor(externalContractTimeLock) {
        super(`External blockchain timeLock ${externalContractTimeLock.format()} is invalid.`);
    }
}
exports.CreateContractInInternalBlockchainTimeLockError = CreateContractInInternalBlockchainTimeLockError;
class ConfirmDepositInternalContractCreatedStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`DepositId: ${id}. Status ${status} is invalid.`);
    }
}
exports.ConfirmDepositInternalContractCreatedStatusError = ConfirmDepositInternalContractCreatedStatusError;
class ConfirmDepositInternalContractRedeemedStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`DepositId: ${id}. Status ${status} is invalid.`);
    }
}
exports.ConfirmDepositInternalContractRedeemedStatusError = ConfirmDepositInternalContractRedeemedStatusError;
class RedeemExecutedInExternalBlockchainStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`DepositId: ${id}. Status ${status} is invalid.`);
    }
}
exports.RedeemExecutedInExternalBlockchainStatusError = RedeemExecutedInExternalBlockchainStatusError;
class CompletedStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`DepositId: ${id}. Status ${status} is invalid.`);
    }
}
exports.CompletedStatusError = CompletedStatusError;
class BurnedStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`DepositId: ${id}. Status ${status} is invalid.`);
    }
}
exports.BurnedStatusError = BurnedStatusError;
class BurnedAmountError extends DomainError_1.DomainError {
    constructor(id, burnedAmount, mintedAmount) {
        super(`DepositId: ${id}. Burned amount ${burnedAmount} is greater than minted amount ${mintedAmount}`);
    }
}
exports.BurnedAmountError = BurnedAmountError;
class SenderIsSanctioned extends UseCaseError_1.UseCaseError {
    constructor() {
        super(`Sender is sanctioned.`);
    }
}
exports.SenderIsSanctioned = SenderIsSanctioned;
class ReceiverIsSanctioned extends UseCaseError_1.UseCaseError {
    constructor() {
        super(`Receiver is sanctioned.`);
    }
}
exports.ReceiverIsSanctioned = ReceiverIsSanctioned;
class WithdrawRequestValidationError extends UseCaseError_1.UseCaseError {
}
exports.WithdrawRequestValidationError = WithdrawRequestValidationError;
//# sourceMappingURL=Errors.js.map