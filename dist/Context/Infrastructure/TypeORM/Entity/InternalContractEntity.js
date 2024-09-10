"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const InternalContract_1 = __importDefault(require("../../../Domain/InternalContract"));
const InternalContractEntity = new typeorm_1.EntitySchema({
    name: "InternalContract",
    tableName: 'internal_contract',
    target: InternalContract_1.default,
    columns: {
        idString: {
            name: 'id',
            type: String,
            primary: true
        },
        _internalId: {
            type: String,
            name: 'internalId',
        },
        _createdAt: {
            name: 'created_at',
            createDate: true,
        },
    },
});
exports.default = InternalContractEntity;
//# sourceMappingURL=InternalContractEntity.js.map