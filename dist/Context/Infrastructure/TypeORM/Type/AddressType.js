"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("../../../Domain/ValueObject/Address"));
const AddressType = {
    type: String,
    transformer: {
        to(address) {
            return address.value;
        },
        from(value) {
            return value ? Address_1.default.create(value) : null;
        },
    },
};
exports.default = AddressType;
//# sourceMappingURL=AddressType.js.map