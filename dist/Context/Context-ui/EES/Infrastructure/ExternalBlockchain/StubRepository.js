"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateNewContractResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/CreateNewContractResponse"));
const RedeemWithdrawResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/RedeemWithdrawResponse"));
const MakeDepositRefundResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/MakeDepositRefundResponse"));
class StubRepository {
    constructor() {
        this._requests = [];
        this._status = true;
        this._txHash = "0xdefc225669c161c4acc15e261778499ff4154ed69b88cefed3d3a3bf07748405";
        this._chainId = 1;
        this._redeemWithdrawRequests = [];
    }
    async create(request) {
        this._requests.push(request);
        return new CreateNewContractResponse_1.default(this._status, this._txHash);
    }
    async getTransactionReceipt(txHash) {
        return null;
    }
    async getContract(contractId, contractAddress) {
        return {};
    }
    async getChainId() {
        return this._chainId;
    }
    get size() {
        return this._requests.length;
    }
    clean() {
        this._requests = [];
    }
    get last() {
        if (this.size === 0) {
            return null;
        }
        return this._requests.pop();
    }
    get txHash() {
        return this._txHash;
    }
    set txHash(value) {
        this._txHash = value;
    }
    set status(value) {
        this._status = value;
    }
    set chainId(value) {
        this._chainId = value;
    }
    async redeemWithdraw(request) {
        this._redeemWithdrawRequests.push(request);
        return new RedeemWithdrawResponse_1.default(this._status, this._txHash);
    }
    async refundDeposit(request) {
        return new MakeDepositRefundResponse_1.default(this._status, this._txHash);
    }
}
exports.default = StubRepository;
//# sourceMappingURL=StubRepository.js.map