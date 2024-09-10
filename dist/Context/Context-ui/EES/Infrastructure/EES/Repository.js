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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importStar(require("axios"));
const apiConfig_1 = require("../../../../api/apiConfig");
const EesErrors = __importStar(require("../../../EES/Domain/EES/Errors"));
class Repository {
    async loadEESSettings() {
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
            eesAccountName: settings.rsquared_ees_account,
            withdrawTimeLock: settings.withdraw_timelock
        };
    }
    async createDepositRequest(internalAccount, hashLock) {
        try {
            const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.SUBMIT_DEPOSIT_REQUEST, {
                rsquaredAccount: internalAccount,
                hashLock: this.ensureHasPrefix(hashLock)
            });
            return result.data.id;
        }
        catch (e) {
            throw new EesErrors.ConnectionError();
        }
    }
    async createWithdrawRequest(internalAccount, amountToPayInRQETH, addressOfUserInEthereum, withdrawalFeeAmount, withdrawalFeeCurrency) {
        var _a, _b;
        try {
            const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.SUBMIT_WITHDRAW_REQUEST, {
                rsquaredAccount: internalAccount,
                amountToPayInRQETH: amountToPayInRQETH,
                addressOfUserInEthereum: addressOfUserInEthereum,
                withdrawalFeeAmount: withdrawalFeeAmount,
                withdrawalFeeCurrency: withdrawalFeeCurrency
            });
            return result.data.id;
        }
        catch (e) {
            if (e instanceof axios_1.AxiosError) {
                throw new EesErrors.ConnectionError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
            }
            throw new EesErrors.ConnectionError();
        }
    }
    async checkDepositSubmittedToInternalBlockchain(sessionId) {
        const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.CHECK_DEPOSIT_SUBMITTED_TO_INTERNAL_BLOCKCHAIN, {
            sessionId: sessionId
        });
        return result.data.submitted;
    }
    async getWithdrawExternalContractId(sessionId) {
        const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.GET_WITHDRAW_EXTERNAL_CONTRACT_ID, {
            sessionId: sessionId
        });
        return result.data.contractId;
    }
    async getDepositExternalContractRefundData(sessionId) {
        const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.GET_DEPOSIT_EXTERNAL_CONTRACT_ID, {
            sessionId: sessionId
        });
        return {
            contractId: result.data.contractId,
            sender: result.data.sender,
            refundedInExternalBlockchain: result.data.refundedInExternalBlockchain
        };
    }
    async getDepositsStatuses(sessionIds) {
        const result = await axios_1.default.post(apiConfig_1.EesAPI.BASE + apiConfig_1.EesAPI.GET_DEPOSITS_STATUSES, {
            sessionIds: sessionIds
        });
        return result.data;
    }
    ensureHasPrefix(hashLock) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }
        return hashLock;
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map