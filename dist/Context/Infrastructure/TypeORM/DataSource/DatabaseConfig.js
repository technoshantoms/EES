"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Subscriber_1 = __importDefault(require("../../../Core/Infrastructure/TypeORM/Subscriber"));
const DepositEntity_1 = __importDefault(require("../Entity/DepositEntity"));
const DepositRequestEntity_1 = __importDefault(require("../Entity/DepositRequestEntity"));
const ExternalContractEntity_1 = __importDefault(require("../Entity/ExternalContractEntity"));
const SettingEntity_1 = __importDefault(require("../../../Setting/Infrastructure/TypeOrm/Entity/SettingEntity"));
const config_1 = __importDefault(require("../../../config"));
const InternalContractEntity_1 = __importDefault(require("../Entity/InternalContractEntity"));
const WithdrawRequestEntity_1 = __importDefault(require("../Entity/WithdrawRequestEntity"));
const WithdrawEntity_1 = __importDefault(require("../Entity/WithdrawEntity"));
const DatabaseConfig = {
    type: "mysql",
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    username: config_1.default.db.user,
    password: config_1.default.db.password,
    database: config_1.default.db.name,
    entities: [
        DepositRequestEntity_1.default,
        DepositEntity_1.default,
        ExternalContractEntity_1.default,
        InternalContractEntity_1.default,
        SettingEntity_1.default,
        WithdrawRequestEntity_1.default,
        WithdrawEntity_1.default,
    ],
    migrations: [path_1.default.join(__dirname, "..", "migrations", "*.ts")],
    subscribers: [Subscriber_1.default],
    migrationsRun: config_1.default.isTest,
    logging: false,
};
exports.default = DatabaseConfig;
//# sourceMappingURL=DatabaseConfig.js.map