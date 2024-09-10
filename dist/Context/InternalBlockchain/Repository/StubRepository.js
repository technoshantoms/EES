"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const ASSET_PRECISION = 4;
class StubRepository {
    constructor() {
        this._newContracts = [];
        this._internalContracts = [];
        this._operationsRedeem = [];
        this._operationsBurn = [];
    }
    createContract(externalId, accountToName, amount, hashLock, timeLock) {
        this._newContracts.push({ externalId, accountToName, amount, hashLock, timeLock });
    }
    get contracts() {
        return this._newContracts;
    }
    addInternalContract(contract) {
        this._internalContracts.push(contract);
    }
    async getIncomingContracts(start) {
        return this._internalContracts;
    }
    getRefundOperations(account) {
        return Promise.resolve([]);
    }
    async addRedeemOperation(operationRedeem) {
        this._operationsRedeem.push(operationRedeem);
    }
    async getRedeemOperations(account) {
        return this._operationsRedeem;
    }
    async disconnect() {
        return undefined;
    }
    burnAsset(amount) {
        return;
    }
    async getInternalAsset() {
        return (0, immutable_1.Map)({ precision: ASSET_PRECISION });
    }
    async getAsset(assetId) {
        return (0, immutable_1.Map)({ id: assetId, precision: ASSET_PRECISION });
    }
    async getAccountHistory(lastProcessedAccountHistoryOperation) {
        return [];
    }
    async getAccount(accountId) {
        return (0, immutable_1.Map)({ id: accountId });
    }
    async getEesAccount() {
        return (0, immutable_1.Map)({ id: "1.2.70" });
    }
    async addBurnOperation(operationBurn) {
        this._operationsBurn.push(operationBurn);
    }
    async getBurnOperations(account) {
        return this._operationsBurn;
    }
    async getObject(objectId) {
        return (0, immutable_1.Map)({ id: objectId });
    }
    async getLastIrreversibleBlockNumber() {
        return 1000000;
    }
    async withdrawRedeem(preimage, contractId, amount) {
        return;
    }
}
exports.default = StubRepository;
//# sourceMappingURL=StubRepository.js.map