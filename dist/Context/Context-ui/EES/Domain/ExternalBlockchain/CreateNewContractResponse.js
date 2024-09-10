"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateNewContractResponse {
    constructor(_success, _txHash) {
        this._success = _success;
        this._txHash = _txHash;
    }
    get success() {
        return this._success;
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = CreateNewContractResponse;
//# sourceMappingURL=CreateNewContractResponse.js.map