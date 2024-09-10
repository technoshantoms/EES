"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../../../Infrastructure/Errors");
const DepositRequest_1 = __importDefault(require("../../../Domain/DepositRequest"));
const NativeAccount_1 = __importDefault(require("../../../Domain/ValueObject/NativeAccount"));
const HashLock_1 = __importDefault(require("../../../Domain/ValueObject/HashLock"));
const Errors = __importStar(require("./Errors"));
class SubmitDepositRequestHandler {
    constructor(_repository) {
        this._repository = _repository;
    }
    async execute(command) {
        const nativeAccount = NativeAccount_1.default.create(command.nativeAccount);
        const hashLock = HashLock_1.default.create(command.hashLock);
        const exists = await this._repository.load(hashLock);
        if (exists) {
            throw new Errors.DepositRequestAlreadyExists(command.hashLock);
        }
        const depositRequest = DepositRequest_1.default.create(nativeAccount, hashLock);
        try {
            await this._repository.create(depositRequest);
        }
        catch (e) {
            throw new Errors_1.DatabaseConnectionError();
        }
        return depositRequest.id.toString();
    }
}
exports.default = SubmitDepositRequestHandler;
//# sourceMappingURL=SubmitDepositRequestHandler.js.map