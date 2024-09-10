"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtlcContract {
    constructor(_id, _message) {
        this._id = _id;
        this._message = _message;
    }
    get id() {
        return this._id;
    }
    get message() {
        return this._message;
    }
    hasMessage() {
        return this._message !== "";
    }
}
exports.default = HtlcContract;
//# sourceMappingURL=HtlcContract.js.map