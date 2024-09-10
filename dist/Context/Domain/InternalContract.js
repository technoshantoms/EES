"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../Core/Domain/Entity"));
class InternalContract extends Entity_1.default {
    constructor(_internalId) {
        super();
        this._internalId = _internalId;
        this._createdAt = new Date();
        this._status = 1;
    }
    get internalId() {
        return this._internalId;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
}
exports.default = InternalContract;
//# sourceMappingURL=InternalContract.js.map