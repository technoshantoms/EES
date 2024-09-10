"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAddressNotSelectedError = void 0;
const AppError_1 = require("../../../Core/Logic/AppError");
class CurrentAddressNotSelectedError extends AppError_1.UseCaseError {
    constructor() {
        super("Current address not selected");
    }
}
exports.CurrentAddressNotSelectedError = CurrentAddressNotSelectedError;
//# sourceMappingURL=Errors.js.map