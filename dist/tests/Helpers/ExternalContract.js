"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExternalContract = void 0;
const UniqueEntityID_1 = __importDefault(require("../../Context/Core/Domain/UniqueEntityID"));
const ExternalContract_1 = __importDefault(require("../../Context/Domain/ExternalContract"));
const dayjs_1 = __importDefault(require("dayjs"));
const Address_1 = __importDefault(require("../../Context/Domain/ValueObject/Address"));
const HashLock_1 = __importDefault(require("../../Context/Domain/ValueObject/HashLock"));
const TimeLock_1 = __importDefault(require("../../Context/Domain/ValueObject/TimeLock"));
const idDefault = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
const sender = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E';
const receiver = '0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E';
const value = '10000000000000000';
const hashLock = '0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c';
const timeLock = (0, dayjs_1.default)().add(10, 'day').unix();
const txHash = '0x2592cf699903e83bfd664aa4e339388fd044fe31643a85037be803a5d162729f';
function createExternalContract(params) {
    var _a, _b, _c;
    return new ExternalContract_1.default(new UniqueEntityID_1.default((_a = params === null || params === void 0 ? void 0 : params.id) !== null && _a !== void 0 ? _a : idDefault), Address_1.default.create(sender), Address_1.default.create(receiver), value, HashLock_1.default.create(hashLock), TimeLock_1.default.fromUnix((_b = params === null || params === void 0 ? void 0 : params.timeLock) !== null && _b !== void 0 ? _b : timeLock), (_c = params === null || params === void 0 ? void 0 : params.txHash) !== null && _c !== void 0 ? _c : txHash);
}
exports.createExternalContract = createExternalContract;
//# sourceMappingURL=ExternalContract.js.map