"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NativeAccount_1 = __importDefault(require("../../../Domain/ValueObject/NativeAccount"));
const NativeAccountType = {
    type: String,
    name: "native_account",
    transformer: {
        to(nativeAccount) {
            return nativeAccount.value;
        },
        from(value) {
            return value ? NativeAccount_1.default.create(value) : null;
        },
    },
};
exports.default = NativeAccountType;
//# sourceMappingURL=NativeAccountType.js.map