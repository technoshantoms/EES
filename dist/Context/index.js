"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDepositRequestHandler = exports.SubmitDepositRequest = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const DataSource_1 = __importDefault(require("./Infrastructure/TypeORM/DataSource/DataSource"));
const DepositRequestRepository_1 = __importDefault(require("./Infrastructure/TypeORM/DepositRequestRepository"));
const SubmitDepositRequest_1 = __importDefault(require("./Application/Command/SubmitDepositRequest/SubmitDepositRequest"));
exports.SubmitDepositRequest = SubmitDepositRequest_1.default;
const SubmitDepositRequestHandler_1 = __importDefault(require("./Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler"));
dayjs_1.default.extend(duration_1.default);
const depositRequestRepository = new DepositRequestRepository_1.default(DataSource_1.default);
const submitDepositRequestHandler = new SubmitDepositRequestHandler_1.default(depositRequestRepository);
exports.submitDepositRequestHandler = submitDepositRequestHandler;
//# sourceMappingURL=index.js.map