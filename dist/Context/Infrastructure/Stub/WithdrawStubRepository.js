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
const Withdraw_1 = __importStar(require("../../Domain/Withdraw"));
class WithdrawStubRepository {
    constructor() {
        this._exists = false;
        this._withdraws = {};
    }
    save(withdraw) {
        this._withdraws[withdraw.id.toValue()] = withdraw;
    }
    getAllForCheck() {
        const withdraws = Object.values(this._withdraws).filter((withdraw) => {
            return withdraw.status === Withdraw_1.STATUS_CREATED_IN_INTERNAL_BLOCKCHAIN;
        });
        return Promise.resolve(withdraws);
    }
    getById(id) {
        var _a;
        return Promise.resolve((_a = this._withdraws[id]) !== null && _a !== void 0 ? _a : null);
    }
    getByRequestId(requestId) {
        for (const withdraw of Object.values(this._withdraws)) {
            if (withdraw.withdrawRequest.id.toString() === requestId) {
                return Promise.resolve(withdraw);
            }
        }
        return Promise.resolve(null);
    }
    getByTxHash(txHash) {
        for (const withdraw of Object.values(this._withdraws)) {
            if (withdraw.txHash === txHash) {
                return Promise.resolve(withdraw);
            }
        }
        return Promise.resolve(null);
    }
    getByRedeemTxHash(txHash) {
        for (const withdraw of Object.values(this._withdraws)) {
            if (withdraw.externalBlockchainRedeemTxHash === txHash) {
                return Promise.resolve(withdraw);
            }
        }
        return Promise.resolve(null);
    }
    async getByExternalContractId(contractId) {
        var _a;
        for (const key in this._withdraws) {
            if (this._withdraws[key] instanceof Withdraw_1.default &&
                ((_a = this._withdraws[key].externalContract) === null || _a === void 0 ? void 0 : _a.idString) === contractId) {
                return this._withdraws[key];
            }
        }
        return null;
    }
    getByRedeemStatus() {
        const withdraws = Object.values(this._withdraws).filter((withdraw) => {
            return withdraw.status === Withdraw_1.STATUS_REDEEM_EXECUTED_IN_EXTERNAL_BLOCKCHAIN;
        });
        return Promise.resolve(withdraws);
    }
    getByInternalContractId(contractId) {
        var _a;
        for (const withdraw of Object.values(this._withdraws)) {
            if (((_a = withdraw.internalContract) === null || _a === void 0 ? void 0 : _a.idString) === contractId) {
                return Promise.resolve(withdraw);
            }
        }
        return Promise.resolve(null);
    }
    getAllRedeemed() {
        const withdraws = Object.values(this._withdraws).filter((withdraw) => {
            return withdraw.status === Withdraw_1.STATUS_REDEEMED;
        });
        return Promise.resolve(withdraws);
    }
    getAllReadyToRefund() {
        const withdraws = Object.values(this._withdraws).filter((withdraw) => {
            return withdraw.status === Withdraw_1.STATUS_SEND_IN_REPLY;
        });
        return Promise.resolve(withdraws);
    }
    getByRefundTxHash(txHash) {
        for (const withdraw of Object.values(this._withdraws)) {
            if (withdraw.externalBlockchainRefundTxHash === txHash) {
                return Promise.resolve(withdraw);
            }
        }
        return Promise.resolve(null);
    }
}
exports.default = WithdrawStubRepository;
//# sourceMappingURL=WithdrawStubRepository.js.map