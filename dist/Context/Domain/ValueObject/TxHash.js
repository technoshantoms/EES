"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = __importDefault(require("../../Core/Domain/ValueObject"));
const Core_1 = require("../../Core");
class TxHash extends ValueObject_1.default {
    constructor(props) {
        super(props);
    }
    static create(txHash) {
        if (txHash.length === 0) {
            return Core_1.Result.fail('Must provide a transaction hash');
        }
        if (!/^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
            return Core_1.Result.fail('txHash is invalid');
        }
        return Core_1.Result.ok(new TxHash({ value: txHash }));
    }
}
exports.default = TxHash;
//# sourceMappingURL=TxHash.js.map