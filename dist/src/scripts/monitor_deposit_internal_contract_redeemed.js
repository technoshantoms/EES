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
const AfterIncomingContractRedeemed_1 = __importDefault(require("../../Context/Subscribers/AfterIncomingContractRedeemed"));
const ConfirmDepositInternalContractRedeemed_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemed"));
const ConfirmDepositInternalContractRedeemedHandler_1 = __importDefault(require("../../Context/Application/Command/InternalBlockchain/ConfirmDepositInternalContractRedeemed/ConfirmDepositInternalContractRedeemedHandler"));
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
new AfterIncomingContractRedeemed_1.default();
let depositRepository;
let internalBlockchain;
let confirmDepositInternalContractRedeemedHandler;
const errorHandler = new Handler_1.default("MonitorDepositInternalContractRedeemed");
async function init() {
    depositRepository = new DepositRepository_1.default(DataSource_1.default);
    internalBlockchain = await InternalBlockchain_1.default.init({
        repository: "native",
    });
    confirmDepositInternalContractRedeemedHandler = new ConfirmDepositInternalContractRedeemedHandler_1.default(depositRepository, internalBlockchain);
}
async function main() {
    const deposits = await depositRepository.getWaitingToRedeem();
    for (const deposit of deposits) {
        const command = new ConfirmDepositInternalContractRedeemed_1.default(deposit.idString);
        try {
            await confirmDepositInternalContractRedeemedHandler.execute(command);
        }
        catch (e) {
            errorHandler.handle(e);
        }
    }
    setTimeout(main, interval * 1000);
}
init().then(() => {
    setTimeout(main, interval * 1000);
});
//# sourceMappingURL=monitor_deposit_internal_contract_redeemed.js.map