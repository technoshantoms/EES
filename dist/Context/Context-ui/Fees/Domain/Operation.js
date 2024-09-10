"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const AppError_1 = require("../../Core/Logic/AppError");
class Operation {
    constructor(_id, _name) {
        this._id = _id;
        this._name = _name;
        this._fees = (0, immutable_1.Map)();
        this._showCHParticipantTransferFee = false;
        this._ltmRequired = false;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    addFee(fee) {
        this._fees = this._fees.set(fee.code, fee);
    }
    get fees() {
        return this._fees;
    }
    get updated() {
        return this.fees.find(fee => (fee === null || fee === void 0 ? void 0 : fee.updated) === true) !== undefined;
    }
    get showCHParticipantTransferFee() {
        return this._showCHParticipantTransferFee;
    }
    get ltmRequired() {
        return this._ltmRequired;
    }
    setShowCHParticipantTransferFee() {
        this._showCHParticipantTransferFee = true;
    }
    setLtmRequired() {
        this._ltmRequired = true;
    }
    getFee(code) {
        if (!this.fees.has(code)) {
            throw new AppError_1.AppError(`fee ${code} not found`);
        }
        return this.fees.get(code);
    }
    updateFee(code, newValue) {
        const fee = this.getFee(code);
        fee.update(newValue);
    }
}
exports.default = Operation;
//# sourceMappingURL=Operation.js.map