"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiConfig_1 = require("../../../../../api/apiConfig");
class GetEESSettingsHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(query) {
        const settings = (await axios_1.default.get(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.EES_SETTINGS))
            .data;
        return {
            depositContractAddress: settings.deposit_contract_address,
            withdrawContractAddress: settings.withdraw_contract_address,
            receiverAddress: settings.receiver_address,
            minimumValue: settings.minimum_deposit,
            minimumTimeLock: settings.minimum_timelock,
            rqrxWithdrawalFee: settings.rqrx_withdrawal_fee,
            RQETHWithdrawalFee: settings.rqeth_withdrawal_fee,
            rqethAssetSymbol: settings.rqeth_asset_symbol,
            eesAccountName: settings.ees_account_name,
            withdrawTimeLock: settings.withdraw_timeLock
        };
    }
}
exports.default = GetEESSettingsHandler;
//# sourceMappingURL=GetEESSettingsHandler.js.map