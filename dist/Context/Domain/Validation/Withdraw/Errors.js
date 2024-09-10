"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessedError = exports.RedeemedError = exports.RedeemError = exports.ReadyToSignStatusError = exports.SendInReplyStatusError = exports.InvalidTimelockError = exports.CreateWithdrawExternalContractStatusError = exports.ReadyToProcessError = void 0;
const DomainError_1 = require("../../../Core/Domain/DomainError");
class ReadyToProcessError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.ReadyToProcessError = ReadyToProcessError;
class CreateWithdrawExternalContractStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.CreateWithdrawExternalContractStatusError = CreateWithdrawExternalContractStatusError;
class InvalidTimelockError extends DomainError_1.DomainError {
    constructor(id) {
        super(`WithdrawId: ${id}. Timelock is invalid, must be later.`);
    }
}
exports.InvalidTimelockError = InvalidTimelockError;
class SendInReplyStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.SendInReplyStatusError = SendInReplyStatusError;
class ReadyToSignStatusError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.ReadyToSignStatusError = ReadyToSignStatusError;
class RedeemError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.RedeemError = RedeemError;
class RedeemedError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.RedeemedError = RedeemedError;
class ProcessedError extends DomainError_1.DomainError {
    constructor(id, status) {
        super(`WithdrawId: ${id}. Status ${status} is invalid.`);
    }
}
exports.ProcessedError = ProcessedError;
//# sourceMappingURL=Errors.js.map