"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeposit = void 0;
const Deposit_1 = __importDefault(require("../../Context/Domain/Deposit"));
const DepositRequest_1 = require("./DepositRequest");
const ExternalContract_1 = require("./ExternalContract");
function createDeposit(params) {
    var _a, _b;
    return Deposit_1.default.create((_a = params === null || params === void 0 ? void 0 : params.depositRequest) !== null && _a !== void 0 ? _a : (0, DepositRequest_1.createDepositRequest)(), (_b = params === null || params === void 0 ? void 0 : params.externalContract) !== null && _b !== void 0 ? _b : (0, ExternalContract_1.createExternalContract)());
}
exports.createDeposit = createDeposit;
//# sourceMappingURL=Deposit.js.map