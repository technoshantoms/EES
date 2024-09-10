"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../Core/Domain/Entity"));
const constants_1 = require("@ethersproject/constants");
class ExternalContract extends Entity_1.default {
    constructor(contractId, _sender, _receiver, _value, _hashLock, _timeLock, _txHash) {
        super(contractId);
        this._sender = _sender;
        this._receiver = _receiver;
        this._value = _value;
        this._hashLock = _hashLock;
        this._timeLock = _timeLock;
        this._txHash = _txHash;
        this._withdrawn = false;
        this._refunded = false;
        this._preimage = constants_1.HashZero;
        this._status = 1;
    }
    get sender() {
        return this._sender;
    }
    get receiver() {
        return this._receiver;
    }
    get value() {
        return this._value;
    }
    get hashLock() {
        return this._hashLock;
    }
    get timeLock() {
        return this._timeLock;
    }
    get txHash() {
        return this._txHash;
    }
}
exports.default = ExternalContract;
//# sourceMappingURL=ExternalContract.js.map