"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const DatabaseConfig_1 = __importDefault(require("./DatabaseConfig"));
async function initDataSourceTest() {
    const walletDataSourceTest = new typeorm_1.DataSource(DatabaseConfig_1.default);
    await walletDataSourceTest.initialize();
    return walletDataSourceTest;
}
exports.default = initDataSourceTest;
//# sourceMappingURL=DataSourceTest.js.map