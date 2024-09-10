"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DepositRequest_1 = __importDefault(require("../../../Domain/DepositRequest"));
const NativeAccountType_1 = __importDefault(require("../Type/NativeAccountType"));
const HashLockType_1 = __importDefault(require("../Type/HashLockType"));
const DepositEntity = new typeorm_1.EntitySchema({
    name: "DepositRequest",
    tableName: "deposit_request",
    target: DepositRequest_1.default,
    columns: {
        idString: {
            name: "id",
            type: String,
            primary: true,
        },
        _nativeAccount: NativeAccountType_1.default,
        _hashLock: HashLockType_1.default,
        _status: {
            type: Number,
            name: "status",
        },
        _createdAt: {
            name: "created_at",
            createDate: true,
        },
    },
});
exports.default = DepositEntity;
//# sourceMappingURL=DepositRequestEntity.js.map