"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WithdrawRequest_1 = require("../../Domain/WithdrawRequest");
class WithdrawRequestRepository {
    constructor() {
        this._withdrawRequests = {};
    }
    save(withdrawRequest) {
        this._withdrawRequests[withdrawRequest.idString] = withdrawRequest;
    }
    create(withdrawRequest) {
        this._withdrawRequests[withdrawRequest.id.toValue()] = withdrawRequest;
    }
    get size() {
        return Object.values(this._withdrawRequests).length;
    }
    reset() {
        this._withdrawRequests = {};
    }
    findAllCreated() {
        const withdrawRequests = Object.values(this._withdrawRequests).filter((withdrawRequest) => {
            return withdrawRequest.status == WithdrawRequest_1.STATUS_CREATED;
        });
        return Promise.resolve(withdrawRequests);
    }
}
exports.default = WithdrawRequestRepository;
//# sourceMappingURL=WithdrawRequestRepository.js.map