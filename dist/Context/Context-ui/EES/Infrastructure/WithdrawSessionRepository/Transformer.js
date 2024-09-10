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
Object.defineProperty(exports, "__esModule", { value: true });
const WithdrawSession_1 = __importStar(require("../../Domain/Withdraw/WithdrawSession"));
const WithdrawContract_1 = __importDefault(require("../../Domain/ExternalBlockchain/WithdrawContract"));
class Transformer {
    transform(session) {
        let sessionJson = {
            id: session.id,
            internalAccount: session.internalAccountName,
            value: session.value,
            hashLock: session.hashLock,
            withdrawalFeeCurrency: session.withdrawalFeeCurrency,
            withdrawalFeeAmount: session.withdrawalFeeAmount,
            transactionFeeCurrency: session.transactionFeeCurrency,
            transactionFeeAmount: session.transactionFeeAmount,
            ethereumAddress: session.ethereumAddress,
            status: session.status
        };
        if (session.isReadyToSignInExternalBlockchain()) {
            sessionJson = this.setExternalContract(session, sessionJson);
            sessionJson = this.setInternalContract(session, sessionJson);
        }
        if (session.isRedeemed()) {
            const externalContract = session.externalContract;
            sessionJson.externalContract = {
                id: externalContract.id,
                txHash: externalContract.txHash
            };
            if (session.internalContract) {
                const internalContract = session.internalContract;
                sessionJson.internalContract = {
                    id: internalContract.id
                };
            }
        }
        return sessionJson;
    }
    reverseTransform(sessionJson) {
        var _a, _b, _c, _d;
        const session = WithdrawSession_1.default.create(sessionJson.id, sessionJson.internalAccount, sessionJson.value, sessionJson.hashLock, sessionJson.withdrawalFeeCurrency, sessionJson.withdrawalFeeAmount, sessionJson.transactionFeeCurrency, sessionJson.transactionFeeAmount, sessionJson.ethereumAddress);
        if (sessionJson.status === WithdrawSession_1.STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN) {
            session.submittedInInternalBlockchain();
        }
        if (sessionJson.status === WithdrawSession_1.STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN) {
            session.submittedInInternalBlockchain();
            session.readyToSignInExternalBlockchain(WithdrawContract_1.default.create((_b = (_a = sessionJson.externalContract) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : ""));
        }
        if (sessionJson.status === WithdrawSession_1.STATUS.REDEEMED) {
            const externalContractJson = sessionJson.externalContract;
            session.submittedInInternalBlockchain();
            session.readyToSignInExternalBlockchain(WithdrawContract_1.default.create((_c = externalContractJson === null || externalContractJson === void 0 ? void 0 : externalContractJson.id) !== null && _c !== void 0 ? _c : ""));
            session.redeem((_d = externalContractJson.txHash) !== null && _d !== void 0 ? _d : "");
        }
        return session;
    }
    setExternalContract(session, sessionJson) {
        if (session.externalContract) {
            const externalContract = session.externalContract;
            sessionJson.externalContract = {
                id: externalContract.id,
                txHash: externalContract.txHash
            };
        }
        return sessionJson;
    }
    setInternalContract(session, sessionJson) {
        if (session.internalContract) {
            const internalContract = session.internalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }
        return sessionJson;
    }
}
exports.default = new Transformer();
//# sourceMappingURL=Transformer.js.map