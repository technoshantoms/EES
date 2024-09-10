"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Proposal {
    constructor(_id, _parameters, _operations, _expirationDate, _reviewPeriod) {
        this._id = _id;
        this._parameters = _parameters;
        this._operations = _operations;
        this._expirationDate = _expirationDate;
        this._reviewPeriod = _reviewPeriod;
        this._voted = false;
    }
    get id() {
        return this._id;
    }
    get parameters() {
        return this._parameters;
    }
    get operations() {
        return this._operations;
    }
    get expirationDate() {
        return this._expirationDate;
    }
    get reviewPeriod() {
        return this._reviewPeriod;
    }
    setVoted() {
        this._voted = true;
    }
    revokeVote() {
        this._voted = false;
    }
    get voted() {
        return this._voted;
    }
}
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map