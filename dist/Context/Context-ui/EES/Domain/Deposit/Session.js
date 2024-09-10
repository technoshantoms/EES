"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = void 0;
const Errors_1 = require("../Errors");
var STATUS;
(function (STATUS) {
    STATUS[STATUS["CREATED"] = 1] = "CREATED";
    STATUS[STATUS["PAID"] = 5] = "PAID";
    STATUS[STATUS["CREATED_INTERNAL_BLOCKCHAIN"] = 10] = "CREATED_INTERNAL_BLOCKCHAIN";
    STATUS[STATUS["REDEEMED"] = 15] = "REDEEMED";
    STATUS[STATUS["EXPIRED"] = 95] = "EXPIRED";
    STATUS[STATUS["BURNED"] = 100] = "BURNED";
    STATUS[STATUS["REFUNDED"] = 105] = "REFUNDED";
    STATUS[STATUS["REFUNDED_IN_EXTERNAL_BLOCKCHAIN"] = 110] = "REFUNDED_IN_EXTERNAL_BLOCKCHAIN";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
class Session {
    constructor(_id, _internalAccount, _value, _hashLock, _timeLock) {
        this._id = _id;
        this._internalAccount = _internalAccount;
        this._value = _value;
        this._hashLock = _hashLock;
        this._timeLock = _timeLock;
        this._externalContract = null;
        this._internalContract = null;
        this._status = STATUS.CREATED;
    }
    get id() {
        return this._id;
    }
    get internalAccount() {
        return this._internalAccount;
    }
    get value() {
        return this._value;
    }
    get hashLock() {
        return this._hashLock;
    }
    get timeLock() {
        return this._timeLock;
    }
    get status() {
        if (this.isExpired() && this.isPaid()) {
            return STATUS.EXPIRED;
        }
        return this._status;
    }
    get externalContract() {
        return this._externalContract;
    }
    get internalContract() {
        return this._internalContract;
    }
    isCreated() {
        return this._status === STATUS.CREATED;
    }
    isPaid() {
        return this._status === STATUS.PAID;
    }
    isReadyToRefund() {
        if (!this.isExpired()) {
            return false;
        }
        return (this._status === STATUS.PAID ||
            this._status === STATUS.CREATED_INTERNAL_BLOCKCHAIN ||
            this._status === STATUS.REFUNDED);
    }
    isExpired() {
        return this._timeLock.isBefore();
    }
    isCreatedInternalBlockchain() {
        return this._status === STATUS.CREATED_INTERNAL_BLOCKCHAIN;
    }
    isRedeemed() {
        return this._status === STATUS.REDEEMED;
    }
    pay(externalContract) {
        if (!this.isCreated()) {
            throw new Errors_1.SessionWrongStatusError(this._id, "Can't change status to paid.");
        }
        this._externalContract = externalContract;
        this._status = STATUS.PAID;
    }
    createdInternalBlockchain(internalContract) {
        if (!this.isPaid()) {
            throw new Errors_1.SessionWrongStatusError(this._id, "Can't approve internal contract creation.");
        }
        this._internalContract = internalContract;
        this._status = STATUS.CREATED_INTERNAL_BLOCKCHAIN;
    }
    redeemed() {
        this._status = STATUS.REDEEMED;
    }
    refundedInExternalBlockchain() {
        this._status = STATUS.REFUNDED_IN_EXTERNAL_BLOCKCHAIN;
    }
    static create(id, internalAccount, value, hashLock, timeLock) {
        return new Session(id, internalAccount, value, hashLock, timeLock);
    }
    setStatus(status) {
        this._status = status;
    }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map