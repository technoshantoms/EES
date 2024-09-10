"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Identifier_1 = __importDefault(require("./Identifier"));
class UniqueEntityID extends Identifier_1.default {
    constructor(id) {
        super(id ? id : (0, uuid_1.v4)());
    }
}
exports.default = UniqueEntityID;
//# sourceMappingURL=UniqueEntityID.js.map