"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyFeePool = void 0;
const AppError_1 = require("../../../../Core/Logic/AppError");
class EmptyFeePool extends AppError_1.UseCaseError {
    constructor() {
        super("The fee pool is empty.");
    }
}
exports.EmptyFeePool = EmptyFeePool;
//# sourceMappingURL=Errors.js.map