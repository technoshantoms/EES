"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
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
exports.default = Response;
//# sourceMappingURL=Response.js.map