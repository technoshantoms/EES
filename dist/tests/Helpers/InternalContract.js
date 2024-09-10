"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInternalContract = void 0;
const InternalContract_1 = __importDefault(require("../../Context/Domain/InternalContract"));
const internalContractId = '1.16.1';
function createInternalContract(params) {
    var _a;
    return new InternalContract_1.default((_a = params === null || params === void 0 ? void 0 : params.iternalContractId) !== null && _a !== void 0 ? _a : internalContractId);
}
exports.createInternalContract = createInternalContract;
//# sourceMappingURL=InternalContract.js.map