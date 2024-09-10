"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositNotExists = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class DepositNotExists extends UseCaseError_1.UseCaseError {
    constructor(id) {
        super(`The deposit with id "${id}" not exists.`);
    }
}
exports.DepositNotExists = DepositNotExists;
//# sourceMappingURL=Errors.js.map