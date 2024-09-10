"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockchainTypeTransformer {
    transform(operations) {
        const blockchainOperations = [];
        for (const operationId in operations) {
            const operation = operations[operationId];
            const blockchainFees = {};
            operation.fees.forEach(fee => {
                fee = fee;
                blockchainFees[fee.code] = fee.updated ? fee.newValue : fee.value;
            });
            const blockchainOperation = [operation.id, blockchainFees];
            blockchainOperations.push(blockchainOperation);
        }
        return blockchainOperations;
    }
}
exports.default = BlockchainTypeTransformer;
//# sourceMappingURL=BlockchainTypeTransformer.js.map