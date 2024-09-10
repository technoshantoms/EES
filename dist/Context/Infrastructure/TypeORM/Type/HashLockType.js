"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HashLock_1 = __importDefault(require("../../../Domain/ValueObject/HashLock"));
const HashLockType = {
    type: String,
    nullable: true,
    name: "hash_lock",
    transformer: {
        to(hashLock) {
            return hashLock === null || hashLock === void 0 ? void 0 : hashLock.value;
        },
        from(value) {
            return value ? HashLock_1.default.create(value) : null;
        },
    },
};
exports.default = HashLockType;
//# sourceMappingURL=HashLockType.js.map