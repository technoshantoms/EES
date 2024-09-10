"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Setting_1 = __importDefault(require("../../../Domain/Setting"));
const SettingEntity = new typeorm_1.EntitySchema({
    name: 'Setting',
    target: Setting_1.default,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String
        },
        value: {
            type: String
        }
    },
    indices: [
        {
            name: 'name_idx',
            columns: ['name'],
            unique: true
        }
    ]
});
exports.default = SettingEntity;
//# sourceMappingURL=SettingEntity.js.map