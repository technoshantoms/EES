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
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = __importDefault(require("../../../../config"));
const Errors = __importStar(require("./Errors"));
class CreateContractInInternalBlockchainHandler {
    constructor(repository, internalBlockchain, externalBlockchain, converter, normalizer) {
        this.repository = repository;
        this.internalBlockchain = internalBlockchain;
        this.externalBlockchain = externalBlockchain;
        this.converter = converter;
        this.normalizer = normalizer;
    }
    async execute(command) {
        const deposit = await this.repository.getById(command.depositId);
        if (deposit === null) {
            throw new Errors.DepositNotFound(command.depositId);
        }
        const RQETHAmount = this.converter.convert(this.normalizer.normalize(deposit._externalContract.value, this.externalBlockchain.getAsset())) - config_1.default.r_squared.rqeth_deposit_fee;
        const denormalizedAmount = this.normalizer.denormalize(RQETHAmount, await this.internalBlockchain.getInternalAsset());
        deposit.submittedToInternalBlockchain(denormalizedAmount);
        await this.repository.save(deposit);
        try {
            await this.internalBlockchain.createContract(deposit._externalContract.txHash, deposit._depositRequest.nativeAccount.value, denormalizedAmount, deposit._depositRequest.hashLock.value.substring(2), this.timeLock());
        }
        catch (e) {
            deposit.resetToCreated();
            await this.repository.save(deposit);
            throw e;
        }
    }
    timeLock() {
        return (0, dayjs_1.default)().add(config_1.default.r_squared.redeem_timeframe, "minutes").diff((0, dayjs_1.default)(), "seconds");
    }
}
exports.default = CreateContractInInternalBlockchainHandler;
//# sourceMappingURL=CreateContractInInternalBlockchainHandler.js.map