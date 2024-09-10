"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./Core/config"));
const web3_1 = __importDefault(require("web3"));
const process = __importStar(require("process"));
const config = Object.assign(Object.assign({}, config_1.default.config()), { contract: {
        minimum_timelock: parseInt(process.env.MINUMUM_TIMELOCK),
        withdraw_internal_timelock: parseInt(process.env.WITHDRAW_INTERNAL_TIMELOCK),
        withdraw_external_timelock: parseInt(process.env.WITHDRAW_EXTERNAL_TIMELOCK),
    }, worker: {
        period: parseInt((_a = process.env.WORKER_PERIOD) !== null && _a !== void 0 ? _a : "10"),
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
        minimum_withdraw_amount: parseFloat(process.env.MINIMUM_DEPOSIT_AMOUNT),
        deposit_contract_address: process.env.ETH_DEPOSIT_CONTRACT_ADDRESS,
        withdraw_contract_address: process.env.ETH_WITHDRAW_CONTRACT_ADDRESS,
        deploy_block_number: parseInt(process.env.ETH_DEPLOY_CONTRACT_BLOCK, 10),
        receiver: process.env.ETH_RECEIVER,
        required_block_confirmations: parseInt(process.env.ETH_REQUIRED_BLOCK_CONFIRMATIONS, 10),
        redeem_timeframe: parseInt(process.env.TIMEFRAME_REDEEM_EXTERNAL_BLOCKCHAIN, 10),
    }, r_squared: {
        node_url: process.env.INTERNAL_NODE_URL,
        ees_account: process.env.INTERNAL_EES_ACCOUNT,
        asset_symbol: process.env.INTERNAL_ASSET_SYMBOL,
        asset_id: process.env.INTERNAL_ASSET_ID,
        account_private_key: process.env.INTERNAL_ACCOUNT_PRIVATE_KEY,
        redeem_timeframe: parseInt(process.env.TIMEFRAME_REDEEM_INTERNAL_BLOCKCHAIN, 10),
        chain_id: process.env.INTERNALP_CHAIN_ID,
        rqrx_withdrawal_fee: parseFloat(process.env.INTERNAL_RQRX_WITHDRAWAL_FEE),
        rqeth_withdrawal_fee: parseFloat(process.env.INTERNAL_RQETH_WITHDRAWAL_FEE),
        rqeth_deposit_fee: parseFloat(process.env.INTERNAL_RQETH_DEPOSIT_FEE),
        eth_to_rqeth_rate: parseFloat((_b = process.env.INTERNAL_ETH_TO_RQETH_RATE) !== null && _b !== void 0 ? _b : "1"),
        chain_network_name: process.env.INTERNAL_CHAIN_NETWORK_NAME,
        rqeth_asset_symbol: process.env.INTERNAL_RQETH_ASSET_SYMBOL,
    }, db: {
        name: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    }, rabbitmq: {
        host: process.env.RABBITMQ_HOST,
        port: parseInt(process.env.RABBITMQ_PORT, 10),
    } });
exports.default = config;
//# sourceMappingURL=config.js.map