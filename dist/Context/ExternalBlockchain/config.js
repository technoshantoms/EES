"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../Core/config"));
const web3_1 = __importDefault(require("web3"));
const config = Object.assign(Object.assign({}, config_1.default.config()), { contract: {
        minimum_timelock: parseInt(process.env.MINUMUM_TIMELOCK, 10),
    }, eth: {
        providers: {
            infura: {
                api_key: process.env.INFURA_API_KEY,
            },
        },
        provider: "infura",
        network: process.env.ETH_NETWORK_NAME,
        private_key: process.env.ETH_PRIVATE_KEY,
        minimum_deposit_amount: web3_1.default.utils.toBN(web3_1.default.utils.toWei(process.env.MINIMUM_DEPOSIT_AMOUNT)),
        deposit_contract_address: process.env.ETH_DEPOSIT_CONTRACT_ADDRESS,
        withdraw_contract_address: process.env.ETH_WITHDRAW_CONTRACT_ADDRESS,
        receiver: process.env.ETH_RECEIVER,
    } });
exports.default = config;
//# sourceMappingURL=config.js.map