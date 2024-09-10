"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const ValueObject_1 = __importDefault(require("../../Core/Domain/ValueObject"));
class TimeLock extends ValueObject_1.default {
    constructor(props) {
        super(props);
    }
    static fromUnix(timeLock) {
        return new TimeLock({ value: dayjs_1.default.unix(timeLock) });
    }
    static fromDate(timeLock) {
        return new TimeLock({ value: (0, dayjs_1.default)(timeLock) });
    }
    get unix() {
        return this.value.unix();
    }
}
exports.default = TimeLock;
//# sourceMappingURL=TimeLock.js.map