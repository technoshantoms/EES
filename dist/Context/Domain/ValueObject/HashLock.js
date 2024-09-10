"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = __importDefault(require("../../Core/Domain/ValueObject"));
const Errors_1 = require("../Errors");
class HashLock extends ValueObject_1.default {
    constructor(props) {
        super(props);
    }
    static create(hashLock) {
        if (!hashLock || hashLock.length === 0) {
            throw new Errors_1.HashLockValidationError('HashLock can not be empty', hashLock);
        }
        if (!/^0x([A-Fa-f0-9]{64})$/.test(hashLock)) {
            throw new Errors_1.HashLockValidationError('HashLock format is invalid', hashLock);
        }
        return new HashLock({ value: hashLock });
    }
}
exports.default = HashLock;
//# sourceMappingURL=HashLock.js.map