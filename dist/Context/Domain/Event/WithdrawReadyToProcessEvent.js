"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WithdrawReadyToProcessEvent {
    constructor(withdrawId) {
        this.withdrawId = withdrawId;
        this.dateTimeOccurred = new Date();
    }
    static eventName() {
        return "withdraw_ready_to_process_event";
    }
}
exports.default = WithdrawReadyToProcessEvent;
//# sourceMappingURL=WithdrawReadyToProcessEvent.js.map