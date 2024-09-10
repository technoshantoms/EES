"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
class UpdateOperationHandler {
    execute(request) {
        const operation = request.operation;
        try {
            operation.updateFee(request.feeCode, request.value);
        }
        catch (e) {
            return Result_1.Failure.create(e);
        }
        return Result_1.Success.create(operation);
    }
}
exports.default = UpdateOperationHandler;
//# sourceMappingURL=UpdateOperationHandler.js.map