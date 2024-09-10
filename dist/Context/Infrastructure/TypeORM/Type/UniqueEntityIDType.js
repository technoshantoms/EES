"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = __importDefault(require("../../../Core/Domain/UniqueEntityID"));
const UniqueEntityIDType = {
    type: String,
    primary: true,
    transformer: {
        to(value) {
            return value.toValue();
        },
        from(value) {
            return new UniqueEntityID_1.default(value);
        }
    }
};
exports.default = UniqueEntityIDType;
//# sourceMappingURL=UniqueEntityIDType.js.map