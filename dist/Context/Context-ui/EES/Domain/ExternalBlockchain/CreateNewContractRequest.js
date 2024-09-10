"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateNewContractRequest {
    constructor(_senderAddress, _contractAddress, _receiver, _amount, _hashLock, _timeLock) {
        this._senderAddress = _senderAddress;
        this._contractAddress = _contractAddress;
        this._receiver = _receiver;
        this._amount = _amount;
        this._hashLock = _hashLock;
        this._timeLock = _timeLock;
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
    get amount() {
        return this._amount;
    }
    get hashLock() {
        return this._hashLock;
    }
    get timeLock() {
        return this._timeLock;
    }
}
exports.default = CreateNewContractRequest;
//# sourceMappingURL=CreateNewContractRequest.js.map