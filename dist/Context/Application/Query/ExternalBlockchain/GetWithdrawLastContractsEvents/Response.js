"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(_fromBlock, _toBlock, _events) {
        this._fromBlock = _fromBlock;
        this._toBlock = _toBlock;
        this._events = _events;
    }
    get fromBlock() {
        return this._fromBlock;
    }
    get toBlock() {
        return this._toBlock;
    }
    get events() {
        return this._events;
    }
}
exports.default = Response;
//# sourceMappingURL=Response.js.map