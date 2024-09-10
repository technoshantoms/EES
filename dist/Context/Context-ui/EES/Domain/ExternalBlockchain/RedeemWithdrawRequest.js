"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedeemWithdrawRequest {
    constructor(_contractId, _preimage, _senderAddress, _contractAddress, _receiver) {
        this._contractId = _contractId;
        this._preimage = _preimage;
        this._senderAddress = _senderAddress;
        this._contractAddress = _contractAddress;
        this._receiver = _receiver;
    }
    get contractId() {
        return this._contractId;
    }
    get preimage() {
        return this._preimage;
    }
    get senderAddress() {
        return this._senderAddress;
    }
    get contractAddress() {
        return this._contractAddress;
    }
    get receiver() {
        return this._receiver;
    }
}
exports.default = RedeemWithdrawRequest;
//# sourceMappingURL=RedeemWithdrawRequest.js.map