"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FromBlockHashEqualsToBlockHash = exports.FromBlockLargerThanToBlock = exports.BlockNotExists = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class BlockNotExists extends UseCaseError_1.UseCaseError {
    constructor(number) {
        super(`The block with number ${number} was not found.`);
    }
}
exports.BlockNotExists = BlockNotExists;
class FromBlockLargerThanToBlock extends UseCaseError_1.UseCaseError {
    constructor(fromBlockNumber, toBlockNumber) {
        super(`lastIrreversibleBlockNumber ${fromBlockNumber} less or equal than lastProcessedBlockNumber ${toBlockNumber}.`);
    }
}
exports.FromBlockLargerThanToBlock = FromBlockLargerThanToBlock;
class FromBlockHashEqualsToBlockHash extends UseCaseError_1.UseCaseError {
    constructor(hash, number) {
        super(`fromBlock hash and toBlock hash are equal: ${hash}, number: ${number}.`);
    }
}
exports.FromBlockHashEqualsToBlockHash = FromBlockHashEqualsToBlockHash;
//# sourceMappingURL=Errors.js.map