"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operation {
    constructor(_id, _fees) {
        this._id = _id;
        this._fees = _fees;
    }
    get id() {
        return this._id;
    }
    get changed() {
        return this.fees.find(fee => fee.changed) !== undefined;
    }
    get fees() {
        return this._fees;
    }
    static create(id, fees) {
        return new Operation(id, fees);
    }
}
exports.default = Operation;
//# sourceMappingURL=Operation.js.map