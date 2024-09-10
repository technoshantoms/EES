"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepositRequest = void 0;
const DepositRequest_1 = __importDefault(require("../../Context/Domain/DepositRequest"));
const NativeAccount_1 = __importDefault(require("../../Context/Domain/ValueObject/NativeAccount"));
const HashLock_1 = __importDefault(require("../../Context/Domain/ValueObject/HashLock"));
const internalAccountDefault = "native_account_name";
const hashLockDefault = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
function createDepositRequest(internalAccount, hashLock) {
    return DepositRequest_1.default.create(NativeAccount_1.default.create(internalAccount !== null && internalAccount !== void 0 ? internalAccount : internalAccountDefault), HashLock_1.default.create(hashLock !== null && hashLock !== void 0 ? hashLock : hashLockDefault));
}
exports.createDepositRequest = createDepositRequest;
//# sourceMappingURL=DepositRequest.js.map