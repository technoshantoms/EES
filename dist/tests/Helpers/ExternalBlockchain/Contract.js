"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContract = void 0;
const Contract_1 = __importDefault(require("../../../Context/ExternalBlockchain/Contract"));
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("@ethersproject/constants");
const contractId = 'contract_id';
const sender = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198D';
const receiver = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E';
const value = '10000000000000000';
const hashLock = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
const timeLock = (0, dayjs_1.default)().add(10, 'day').unix();
const withdrawn = false;
const refunded = false;
const preimage = constants_1.HashZero;
function createContract(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return new Contract_1.default((_a = params === null || params === void 0 ? void 0 : params.contractId) !== null && _a !== void 0 ? _a : contractId, (_b = params === null || params === void 0 ? void 0 : params.sender) !== null && _b !== void 0 ? _b : sender, (_c = params === null || params === void 0 ? void 0 : params.receiver) !== null && _c !== void 0 ? _c : receiver, (_d = params === null || params === void 0 ? void 0 : params.value) !== null && _d !== void 0 ? _d : value, (_e = params === null || params === void 0 ? void 0 : params.hashLock) !== null && _e !== void 0 ? _e : hashLock, (_f = params === null || params === void 0 ? void 0 : params.timeLock) !== null && _f !== void 0 ? _f : timeLock, (_g = params === null || params === void 0 ? void 0 : params.withdrawn) !== null && _g !== void 0 ? _g : withdrawn, (_h = params === null || params === void 0 ? void 0 : params.refunded) !== null && _h !== void 0 ? _h : refunded, (_j = params === null || params === void 0 ? void 0 : params.preimage) !== null && _j !== void 0 ? _j : preimage);
}
exports.createContract = createContract;
//# sourceMappingURL=Contract.js.map