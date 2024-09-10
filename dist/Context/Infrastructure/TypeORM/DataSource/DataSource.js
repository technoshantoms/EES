"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const DatabaseConfig_1 = __importDefault(require("./DatabaseConfig"));
const DataSource = new typeorm_1.DataSource(DatabaseConfig_1.default);
DataSource.initialize();
exports.default = DataSource;
//# sourceMappingURL=DataSource.js.map