"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllRawParameters = exports.loadAllParameters = void 0;
const index_1 = require("./index");
const BlockchainRepository_1 = __importDefault(require("./Infrastructure/BlockchainRepository"));
async function loadAllParameters() {
    const query = new index_1.LoadAll();
    return await index_1.loadAllHandler.execute(query);
}
exports.loadAllParameters = loadAllParameters;
async function loadAllRawParameters() {
    return await BlockchainRepository_1.default.load();
}
exports.loadAllRawParameters = loadAllRawParameters;
//# sourceMappingURL=Facade.js.map