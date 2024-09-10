"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = __importDefault(require("../../Core/Domain/ValueObject"));
const Errors_1 = require("../Errors");
class NativeAccount extends ValueObject_1.default {
    constructor(props) {
        super(props);
    }
    static create(nativeAccount) {
        if (nativeAccount.length === 0) {
            throw new Errors_1.NativeAccountValidationError('Native account can not be empty', nativeAccount);
        }
        return new NativeAccount({ value: nativeAccount });
    }
}
exports.default = NativeAccount;
//# sourceMappingURL=NativeAccount.js.map