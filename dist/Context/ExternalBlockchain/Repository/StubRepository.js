"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class StubRepository {
    constructor() {
        this._txIncluded = true;
        this._contract = null;
        this._error = null;
        this._redeemedRequests = [];
        this._redeemTxHash = null;
        this._transactionReceipt = null;
        this._lastBlockNumber = 100;
    }
    async txIncluded(txHash) {
        return this._txIncluded;
    }
    async loadDepositContract(txHash, contractId) {
        return this._contract;
    }
    async loadWithdrawContract(txHash, contractId) {
        return this._contract;
    }
    getLastBlockNumber() {
        return Promise.resolve(this._lastBlockNumber);
    }
    async getBlock(number) {
        return {};
    }
    loadDepositHTLCNewEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    loadWithdrawHTLCNewEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    async redeem(contractId, secret, receiver) {
        this._redeemedRequests.push({
            contractId,
            secret,
            receiver,
        });
        return this._redeemTxHash;
    }
    getAsset() {
        return (0, immutable_1.Map)({ precision: 18 });
    }
    reset() {
        this._txIncluded = true;
        this._contract = null;
    }
    loadDepositHTLCRedeemEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    loadWithdrawHTLCRedeemEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    getTransactionReceipt(txHash) {
        return this._transactionReceipt ? Promise.resolve(this._transactionReceipt) : Promise.reject();
    }
    getGasPrice() {
        return Promise.resolve("300");
    }
    createWithdrawHTLC(receiver, hashlock, timelock, amount) {
        return Promise.resolve("");
    }
    refund(contractId) {
        return Promise.resolve("");
    }
    loadWithdrawHTLCRefundEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    loadDepositHTLCRefundEvents(fromBlock, toBlock) {
        return Promise.resolve([]);
    }
    getFee() {
        return Promise.resolve(0);
    }
    setFee(fee) {
        return Promise.resolve("");
    }
}
exports.default = StubRepository;
//# sourceMappingURL=StubRepository.js.map