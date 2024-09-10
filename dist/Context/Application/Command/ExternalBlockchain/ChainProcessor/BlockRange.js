"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockRange {
    constructor(_fromBlock, _toBlock) {
        this._fromBlock = _fromBlock;
        this._toBlock = _toBlock;
    }
    get fromBlock() {
        return this._fromBlock;
    }
    get toBlock() {
        return this._toBlock;
    }
}
exports.default = BlockRange;
//# sourceMappingURL=BlockRange.js.map