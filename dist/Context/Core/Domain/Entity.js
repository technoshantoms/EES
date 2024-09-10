"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = __importDefault(require("./UniqueEntityID"));
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    constructor(id) {
        this._id = id ? id : new UniqueEntityID_1.default();
    }
    get idString() {
        return this._id.toString();
    }
    set idString(id) {
        this._id = new UniqueEntityID_1.default(id);
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
}
exports.default = Entity;
//# sourceMappingURL=Entity.js.map