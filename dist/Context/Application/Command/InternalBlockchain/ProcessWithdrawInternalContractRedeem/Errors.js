"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawWithoutSecret = exports.WithdrawNotFound = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class WithdrawNotFound extends UseCaseError_1.UseCaseError {
    constructor(txHash) {
        super(`The withdraw with tx_hash ${txHash} was not found.`);
    }
}
exports.WithdrawNotFound = WithdrawNotFound;
class WithdrawWithoutSecret extends UseCaseError_1.UseCaseError {
    constructor(withdrawId) {
        super(`The withdraw ${withdrawId} without secret.`);
    }
}
exports.WithdrawWithoutSecret = WithdrawWithoutSecret;
//# sourceMappingURL=Errors.js.map