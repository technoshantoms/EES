"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContract = void 0;
const HtlcContract_1 = __importDefault(require("../../../Context/InternalBlockchain/HtlcContract"));
const id = '1.16.1';
const externalId = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
function createContract(params) {
    var _a, _b;
    return new HtlcContract_1.default((_a = params === null || params === void 0 ? void 0 : params.id) !== null && _a !== void 0 ? _a : id, (_b = params === null || params === void 0 ? void 0 : params.externalId) !== null && _b !== void 0 ? _b : externalId);
}
exports.createContract = createContract;
//# sourceMappingURL=Contract.js.map