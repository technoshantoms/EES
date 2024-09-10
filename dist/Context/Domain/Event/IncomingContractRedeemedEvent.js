"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncomingContractRedeemedEvent {
    constructor(depositId) {
        this.depositId = depositId;
        this.dateTimeOccurred = new Date();
    }
    static eventName() {
        return "incoming_contract_redeemed_event";
    }
}
exports.default = IncomingContractRedeemedEvent;
//# sourceMappingURL=IncomingContractRedeemedEvent.js.map