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
const web3_1 = __importDefault(require("web3"));
const DepositHashedTimelock_json_1 = __importDefault(require("../../../../assets/abi/DepositHashedTimelock.json"));
const WithdrawHashedTimelock_json_1 = __importDefault(require("../../../../assets/abi/WithdrawHashedTimelock.json"));
const CreateNewContractResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/CreateNewContractResponse"));
const RedeemWithdrawResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/RedeemWithdrawResponse"));
const Errors = __importStar(require("./Errors"));
const MakeDepositRefundResponse_1 = __importDefault(require("../../Domain/ExternalBlockchain/MakeDepositRefundResponse"));
class Web3Repository {
    async create(command) {
        const web3 = new web3_1.default(window.ethereum);
        const contract = new web3.eth.Contract(DepositHashedTimelock_json_1.default, command.contractAddress);
        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(command.receiver, command.hashLock, command.timeLock)
                .send({
                from: command.senderAddress,
                value: command.amount
            })
                .on("confirmation", (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    resolve(new CreateNewContractResponse_1.default(true, receipt.transactionHash));
                }
            })
                .on("error", function (error, receipt) {
                reject(new CreateNewContractResponse_1.default(false, ""));
            });
        });
    }
    async getTransactionReceipt(txHash) {
        const web3 = new web3_1.default(window.ethereum);
        return await web3.eth.getTransactionReceipt(txHash);
    }
    async getContract(contractId, contractAddress) {
        const web3 = new web3_1.default(window.ethereum);
        const contract = new web3.eth.Contract(DepositHashedTimelock_json_1.default, contractAddress);
        return await contract.methods.getContract(contractId).call();
    }
    async getChainId() {
        const web3 = new web3_1.default(window.ethereum);
        return web3.eth.getChainId();
    }
    async redeemWithdraw(request) {
        const web3 = new web3_1.default(window.ethereum);
        const contract = new web3.eth.Contract(WithdrawHashedTimelock_json_1.default, request.contractAddress);
        const currentAddress = await this.getCurrentAddress();
        if (currentAddress == null) {
            throw new Errors.CurrentAddressNotSelectedError();
        }
        return new Promise((resolve, reject) => {
            contract.methods
                .withdraw(request.contractId, web3.utils.asciiToHex(request.preimage))
                .send({
                from: request.receiver
            })
                .on("confirmation", (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    resolve(new RedeemWithdrawResponse_1.default(true, receipt.transactionHash));
                }
            })
                .catch((e) => {
                console.log("Error:", e);
                reject(e);
            });
        });
    }
    async getCurrentAddress() {
        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        });
        if (accounts === null ||
            accounts === undefined ||
            accounts.length === 0) {
            return null;
        }
        return accounts[0];
    }
    async refundDeposit(makeDepositRefundRequest) {
        const web3 = new web3_1.default(window.ethereum);
        const contract = new web3.eth.Contract(DepositHashedTimelock_json_1.default, makeDepositRefundRequest.contractAddress);
        return new Promise((resolve, reject) => {
            contract.methods
                .refund(makeDepositRefundRequest.contractId)
                .send({
                from: makeDepositRefundRequest.sender
            })
                .on("confirmation", (confirmationNumber, receipt) => {
                if (receipt.status) {
                    resolve(new MakeDepositRefundResponse_1.default(true, receipt.transactionHash));
                }
                else {
                    resolve(new MakeDepositRefundResponse_1.default(false, "", "Transaction dropped or replaced by Ethereum network."));
                }
            })
                .catch((error) => {
                console.error("Error:", error);
                resolve(new MakeDepositRefundResponse_1.default(false, "", error.message));
            });
        });
    }
}
exports.default = Web3Repository;
//# sourceMappingURL=Web3Repository.js.map