"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakeDepositRefundRequest {
    constructor(_contractId, _contractAddress, _sender) {
        this._contractId = _contractId;
        this._contractAddress = _contractAddress;
        this._sender = _sender;
    }
    get contractId() {
        return this._contractId;
    }
    get contractAddress() {
        return this._contractAddress;
    }
    get sender() {
        return this._sender;
    }
}
exports.default = MakeDepositRefundRequest;
//# sourceMappingURL=MakeDepositRefundRequest.js.map