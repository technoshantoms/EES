"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositRequestAlreadyExists = void 0;
const UseCaseError_1 = require("../../../Core/Logic/UseCaseError");
class DepositRequestAlreadyExists extends UseCaseError_1.UseCaseError {
    constructor(hashLock) {
        super(`The deposit request with hashLock ${hashLock} already exists.`);
    }
}
exports.DepositRequestAlreadyExists = DepositRequestAlreadyExists;
//# sourceMappingURL=Errors.js.map