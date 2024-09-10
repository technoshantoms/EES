"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceTest = exports.mochaHooks = void 0;
const DataSourceTest_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSourceTest"));
const DepositRequest_1 = __importDefault(require("../../Context/Domain/DepositRequest"));
const Deposit_1 = __importDefault(require("../../Context/Domain/Deposit"));
const ExternalContract_1 = __importDefault(require("../../Context/Domain/ExternalContract"));
const InternalContract_1 = __importDefault(require("../../Context/Domain/InternalContract"));
let dataSourceTest;
exports.dataSourceTest = dataSourceTest;
exports.mochaHooks = {
    beforeAll: async () => {
        exports.dataSourceTest = dataSourceTest = await (0, DataSourceTest_1.default)();
    },
    afterAll: async () => {
        await dataSourceTest.destroy();
    },
    afterEach: async () => {
        const entities = [Deposit_1.default, DepositRequest_1.default, ExternalContract_1.default, InternalContract_1.default];
        for (const entity of entities) {
            const metadata = dataSourceTest.getMetadata(entity);
            const repository = await dataSourceTest.getRepository(entity.name);
            await repository.query(`DELETE FROM ${metadata.tableName};`);
        }
    }
};
//# sourceMappingURL=hooks.js.map