"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuccessResponse {
    constructor(_data = null) {
        this._data = _data;
    }
    get data() {
        return this._data;
    }
    static create(data = null) {
        return new SuccessResponse(data);
    }
}
exports.default = SuccessResponse;
//# sourceMappingURL=SuccessResponse.js.map