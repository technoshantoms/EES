"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
class GetChangedHandler {
    execute(request) {
        const operations = request.parameters;
        return Result_1.Success.create(this.findChanged(operations));
    }
    findChanged(operations) {
        const changedOperations = {};
        for (const operationId in operations) {
            const operation = operations[operationId];
            if (!operation.updated) {
                continue;
            }
            changedOperations[operation.id] = operation;
        }
        return changedOperations;
    }
}
exports.default = GetChangedHandler;
//# sourceMappingURL=GetChangedHandler.js.map