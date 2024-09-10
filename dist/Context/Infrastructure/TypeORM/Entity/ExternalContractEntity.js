"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ExternalContract_1 = __importDefault(require("../../../Domain/ExternalContract"));
const AddressType_1 = __importDefault(require("../Type/AddressType"));
const HashLockType_1 = __importDefault(require("../Type/HashLockType"));
const TimeLockType_1 = __importDefault(require("../Type/TimeLockType"));
const ExternalContractEntity = new typeorm_1.EntitySchema({
    name: "ExternalContract",
    tableName: 'external_contract',
    target: ExternalContract_1.default,
    columns: {
        idString: {
            name: 'id',
            type: String,
            primary: true
        },
        _sender: Object.assign(Object.assign({}, AddressType_1.default), { name: 'sender' }),
        _receiver: Object.assign(Object.assign({}, AddressType_1.default), { name: 'receiver' }),
        _value: {
            type: String,
            name: 'value',
        },
        _hashLock: HashLockType_1.default,
        _timeLock: TimeLockType_1.default,
        _txHash: {
            type: String,
            name: 'tx_hash',
        },
        _status: {
            type: Number,
            name: 'status',
        },
        _createdAt: {
            name: 'created_at',
            createDate: true,
        },
    },
});
exports.default = ExternalContractEntity;
//# sourceMappingURL=ExternalContractEntity.js.map