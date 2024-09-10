"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TimeLock_1 = __importDefault(require("../../../Domain/ValueObject/TimeLock"));
const TimeLockType = {
    type: "datetime",
    name: "time_lock",
    transformer: {
        to(timeLock) {
            return timeLock.value.format("YYYY-MM-DD HH:mm:ss");
        },
        from(value) {
            return value ? TimeLock_1.default.fromDate(value) : null;
        },
    },
};
exports.default = TimeLockType;
//# sourceMappingURL=TimeLockType.js.map