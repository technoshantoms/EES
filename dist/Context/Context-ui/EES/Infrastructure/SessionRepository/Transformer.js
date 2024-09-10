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
const moment_1 = __importDefault(require("moment"));
const Session_1 = __importStar(require("../../Domain/Deposit/Session"));
const DepositContract_1 = __importDefault(require("../../Domain/ExternalBlockchain/DepositContract"));
const Contract_1 = __importDefault(require("../../Domain/InternalBlockchain/Contract"));
class Transformer {
    transform(session) {
        const sessionJson = {
            id: session.id,
            internalAccount: session.internalAccount,
            value: session.value,
            hashLock: session.hashLock,
            timeLock: session.timeLock.unix(),
            status: session.status
        };
        if (session.isPaid()) {
            const externalContract = session.externalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };
        }
        if (session.isCreatedInternalBlockchain()) {
            const externalContract = session.externalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };
            const internalContract = session.internalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }
        if (session.isRedeemed()) {
            const externalContract = session.externalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };
            const internalContract = session.internalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }
        return sessionJson;
    }
    reverseTransform(sessionJson) {
        const session = Session_1.default.create(sessionJson.id, sessionJson.internalAccount, sessionJson.value, sessionJson.hashLock, moment_1.default.unix(sessionJson.timeLock));
        if (sessionJson.status === Session_1.STATUS.PAID) {
            const externalContractJson = sessionJson.externalContract;
            const externalContract = new DepositContract_1.default(externalContractJson.txHash);
            session.pay(externalContract);
        }
        if (sessionJson.status === Session_1.STATUS.CREATED_INTERNAL_BLOCKCHAIN) {
            const externalContractJson = sessionJson.externalContract;
            const externalContract = new DepositContract_1.default(externalContractJson.txHash);
            session.pay(externalContract);
            const internalContractJson = sessionJson.internalContract;
            const internalContract = new Contract_1.default(internalContractJson.id, "");
            session.createdInternalBlockchain(internalContract);
        }
        if (sessionJson.status === Session_1.STATUS.REDEEMED) {
            const externalContractJson = sessionJson.externalContract;
            const externalContract = new DepositContract_1.default(externalContractJson.txHash);
            session.pay(externalContract);
            const internalContractJson = sessionJson.internalContract;
            const internalContract = new Contract_1.default(internalContractJson.id, "");
            session.createdInternalBlockchain(internalContract);
            session.redeemed();
        }
        if (sessionJson.status === Session_1.STATUS.REFUNDED_IN_EXTERNAL_BLOCKCHAIN) {
            if (sessionJson.externalContract) {
                const externalContractJson = sessionJson.externalContract;
                const externalContract = new DepositContract_1.default(externalContractJson.txHash);
                session.pay(externalContract);
            }
            if (sessionJson.internalContract) {
                const internalContractJson = sessionJson.internalContract;
                const internalContract = new Contract_1.default(internalContractJson.id, "");
                session.createdInternalBlockchain(internalContract);
            }
            session.refundedInExternalBlockchain();
        }
        if (sessionJson.status === Session_1.STATUS.REFUNDED) {
            session.setStatus(Session_1.STATUS.REFUNDED);
        }
        return session;
    }
}
exports.default = new Transformer();
//# sourceMappingURL=Transformer.js.map