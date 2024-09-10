"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOperationRedeem = void 0;
const OperationRedeem_1 = __importDefault(require("../../../Context/InternalBlockchain/OperationRedeem"));
const account = "native_account_name";
const internalContractId = "1.16.1";
const secret = "b85a0e9f792cb3a9bc7dc75fdb1b795e91cf91ffddacc8d7869638079b02850b";
const transactionId = "1.11.1205898";
function createOperationRedeem(params) {
    var _a, _b;
    return OperationRedeem_1.default.create(account, (_a = params === null || params === void 0 ? void 0 : params.internalContractId) !== null && _a !== void 0 ? _a : internalContractId, (_b = params === null || params === void 0 ? void 0 : params.secret) !== null && _b !== void 0 ? _b : secret, transactionId);
}
exports.createOperationRedeem = createOperationRedeem;
//# sourceMappingURL=OperationRedeem.js.map