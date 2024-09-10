"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const DataSource_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DataSource/DataSource"));
const DepositRepository_1 = __importDefault(require("../../Context/Infrastructure/TypeORM/DepositRepository"));
const InternalBlockchain_1 = __importDefault(require("../../Context/InternalBlockchain/InternalBlockchain"));
const Handler_1 = __importDefault(require("../../Context/Infrastructure/Errors/Handler"));
const ConfirmDepositInternalContractCreated_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreated"));
const ConfirmDepositInternalContractCreatedHandler_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractCreated/ConfirmDepositInternalContractCreatedHandler"));
const Setting_1 = __importDefault(require("../../Context/Setting/Setting"));
const GetLastDepositContractsHandler_1 = __importDefault(require("../../Context/Application/Query/InternalBlockchain/GetLastDepositContracts/GetLastDepositContractsHandler"));
const GetLastDepositContracts_1 = __importDefault(require("../../Context/Application/Query/InternalBlockchain/GetLastDepositContracts/GetLastDepositContracts"));
const config_1 = __importDefault(require("../../Context/config"));
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .option("interval", {
    alias: "i",
    describe: "Launch interval (seconds)",
    default: config_1.default.worker.period,
    type: "number",
})
    .help()
    .parseSync();
const interval = argv.interval;
let depositRepository;
let internalBlockchain;
let settings;
let getLastDepositContractsHandler;
let confirmDepositInternalContractCreatedHandler;
const errorHandler = new Handler_1.default("MonitorDepositInternalContractCreated");
async function init() {
    depositRepository = new DepositRepository_1.default(DataSource_1.default);
    internalBlockchain = await InternalBlockchain_1.default.init({
        repository: "native",
    });
    settings = Setting_1.default.init({
        repository: "typeorm",
        dataSource: DataSource_1.default,
    });
    getLastDepositContractsHandler = new GetLastDepositContractsHandler_1.default(internalBlockchain, settings);
    confirmDepositInternalContractCreatedHandler = new ConfirmDepositInternalContractCreatedHandler_1.default(depositRepository);
}
async function main() {
    const queryGetLastDepositContracts = new GetLastDepositContracts_1.default();
    const depositInternalContracts = await getLastDepositContractsHandler.execute(queryGetLastDepositContracts);
    if (depositInternalContracts.contracts.length === 0) {
        return;
    }
    console.log(`MonitorDepositInternalContractCreated: Found ${depositInternalContracts.contracts.length} internal contracts to processed.`);
    for (const contract of depositInternalContracts.contracts) {
        const query = new ConfirmDepositInternalContractCreated_1.default(contract.message, contract.id);
        try {
            await confirmDepositInternalContractCreatedHandler.execute(query);
            console.log(`MonitorDepositInternalContractCreated: Internal contract ${contract.id} created.`);
        }
        catch (e) {
            errorHandler.handle(e);
        }
    }
}
init().then(() => {
    setInterval(main, interval * 1000);
});
//# sourceMappingURL=monitor_deposit_internal_contract_created.js.map