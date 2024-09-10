"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepositRepository {
    constructor() {
        this._exists = false;
        this._deposits = {};
    }
    create(deposit) {
        this._deposits[deposit.id.toValue()] = deposit;
    }
    save(deposit) {
        this._deposits[deposit.id.toValue()] = deposit;
    }
    exists(contractId) {
        return Promise.resolve(this._exists);
    }
    getById(id) {
        var _a;
        return Promise.resolve((_a = this._deposits[id]) !== null && _a !== void 0 ? _a : null);
    }
    getByRequestId(requestId) {
        for (const deposit of Object.values(this._deposits)) {
            if (deposit._depositRequest.id.toString() === requestId) {
                return Promise.resolve(deposit);
            }
        }
        return Promise.resolve(null);
    }
    getByTxHash(txHash) {
        for (const deposit of Object.values(this._deposits)) {
            if (deposit._externalContract.txHash === txHash) {
                return Promise.resolve(deposit);
            }
        }
        return Promise.resolve(null);
    }
    getWaitingToRedeem() {
        return Promise.resolve([]);
    }
    first() {
        return Object.values(this._deposits)[0];
    }
    get size() {
        return Object.values(this._deposits).length;
    }
    reset() {
        this._deposits = {};
    }
    getByRedeemTxHash(txHash) {
        for (const deposit of Object.values(this._deposits)) {
            if (deposit.externalBlockchainRedeemTxHash === txHash) {
                return Promise.resolve(deposit);
            }
        }
        return Promise.resolve(null);
    }
    getByBurnTxHash(txHash) {
        for (const deposit of Object.values(this._deposits)) {
            if (deposit.internalBlockchainBurnTxHash === txHash) {
                return Promise.resolve(deposit);
            }
        }
        return Promise.resolve(null);
    }
    getOverdueTimeLock() {
        return Promise.resolve([]);
    }
    getBurned() {
        return Promise.resolve([]);
    }
    getByContractId(contractId) {
        for (const deposit of Object.values(this._deposits)) {
            if (deposit._externalContract.idString === contractId) {
                return Promise.resolve(deposit);
            }
        }
        return Promise.resolve(null);
    }
    getByRequestIds(requestIds) {
        const deposits = [];
        for (const deposit of Object.values(this._deposits)) {
            if (requestIds.includes(deposit._depositRequest.id.toString())) {
                deposits.push(deposit);
            }
        }
        return Promise.resolve(deposits);
    }
}
exports.default = DepositRepository;
//# sourceMappingURL=DepositRepository.js.map