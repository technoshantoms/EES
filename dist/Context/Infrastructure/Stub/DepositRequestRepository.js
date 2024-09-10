"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepositRequestRepository {
    constructor() {
        this._depositRequests = {};
    }
    create(depositRequest) {
        this._depositRequests[depositRequest.id.toValue()] = depositRequest;
    }
    load(hashLock) {
        const depositRequest = Object.values(this._depositRequests).find((depositRequest) => {
            return Reflect.get(depositRequest, '_hashLock').equals(hashLock);
        });
        return Promise.resolve(depositRequest !== null && depositRequest !== void 0 ? depositRequest : null);
    }
    get size() {
        return Object.values(this._depositRequests).length;
    }
    reset() {
        this._depositRequests = {};
    }
}
exports.default = DepositRequestRepository;
//# sourceMappingURL=DepositRequestRepository.js.map