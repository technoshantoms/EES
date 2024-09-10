"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = __importDefault(require("../../Core/Domain/ValueObject"));
const Errors_1 = require("../Errors");
class Address extends ValueObject_1.default {
    constructor(props) {
        super(props);
    }
    static create(address) {
        if (address && address.length === 0) {
            throw new Errors_1.AddressValidationError("Must provide an address", address);
        }
        if (!/^0x([A-Fa-f0-9]{40})$/.test(address)) {
            throw new Errors_1.AddressValidationError("Address is invalid", address);
        }
        return new Address({ value: address });
    }
}
exports.default = Address;
//# sourceMappingURL=Address.js.map