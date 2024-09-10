"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateHtlcResponse {
    constructor(status, _txHash) {
        this.status = status;
        this._txHash = _txHash;
    }
    isSuccess() {
        return this.status;
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = CreateHtlcResponse;
//# sourceMappingURL=CreateHtlcResponse.js.map