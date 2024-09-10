"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositNotFound = void 0;
const UseCaseError_1 = require("../../../../../Core/Logic/UseCaseError");
class DepositNotFound extends UseCaseError_1.UseCaseError {
    constructor(depositId) {
        super(`The deposit with ID:${depositId} was not found.`);
    }
}
exports.DepositNotFound = DepositNotFound;
//# sourceMappingURL=Errors.js.map