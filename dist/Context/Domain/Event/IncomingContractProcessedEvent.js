"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IncomingContractProcessedEvent {
    constructor(depositId) {
        this.depositId = depositId;
        this.dateTimeOccurred = new Date();
    }
    static eventName() {
        return "incoming_contract_processed_event";
    }
}
exports.default = IncomingContractProcessedEvent;
//# sourceMappingURL=IncomingContractProcessedEvent.js.map