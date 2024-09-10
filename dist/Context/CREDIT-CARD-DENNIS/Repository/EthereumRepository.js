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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const DepositHashedTimelock_json_1 = __importDefault(require("../../../src/assets/abi/DepositHashedTimelock.json"));
const WithdrawHashedTimelock_json_1 = __importDefault(require("../../../src/assets/abi/WithdrawHashedTimelock.json"));
const Contract_1 = __importDefault(require("../Contract"));
const config_1 = __importDefault(require("../../config"));
const Errors = __importStar(require("../../ExternalBlockchain/Errors"));
const common_1 = require("@nestjs/common");
const immutable_1 = require("immutable");
let EthereumRepository = class EthereumRepository {
    constructor() {
        var _a, _b, _c;
        this._web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(`https://${config_1.default.eth.network}.infura.io/v3/${(_a = config_1.default.eth) === null || _a === void 0 ? void 0 : _a.providers.infura.api_key}`));
        this._depositContract = new this._web3.eth.Contract(DepositHashedTimelock_json_1.default, (_b = config_1.default.eth) === null || _b === void 0 ? void 0 : _b.deposit_contract_address);
        this._withdrawContract = new this._web3.eth.Contract(WithdrawHashedTimelock_json_1.default, (_c = config_1.default.eth) === null || _c === void 0 ? void 0 : _c.withdraw_contract_address);
    }
    async txIncluded(txHash) {
        const tx = await this._web3.eth.getTransaction(txHash);
        const txReceipt = await this._web3.eth.getTransactionReceipt(txHash);
        const log = txReceipt.logs[0];
        return tx.blockNumber !== null && txReceipt.status && !log.removed;
    }
    async loadDepositContract(txHash, contractId) {
        const contractData = await this._depositContract.methods.getContract(contractId).call({
            from: config_1.default.eth.deposit_contract_address,
        });
        return new Contract_1.default(contractId, contractData.sender, contractData.receiver, contractData.amount, contractData.hashlock, contractData.timelock, contractData.withdrawn, contractData.refunded, contractData.preimage);
    }
    async loadWithdrawContract(txHash, contractId) {
        const contractData = await this._withdrawContract.methods.getContract(contractId).call({
            from: config_1.default.eth.withdraw_contract_address,
        });
        return new Contract_1.default(contractId, contractData.sender, contractData.receiver, contractData.amount, contractData.hashlock, contractData.timelock, contractData.withdrawn, contractData.refunded, contractData.preimage);
    }
    async getLastBlockNumber() {
        return await this._web3.eth.getBlockNumber();
    }
    async getBlock(number) {
        return await this._web3.eth.getBlock(number);
    }
    async loadDepositHTLCNewEvents(fromBlock, toBlock) {
        return await this._depositContract.getPastEvents("LogHTLCNew", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
    async loadWithdrawHTLCNewEvents(fromBlock, toBlock) {
        return await this._withdrawContract.getPastEvents("LogHTLCNew", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
    async loadDepositHTLCRedeemEvents(fromBlock, toBlock) {
        return await this._depositContract.getPastEvents("LogHTLCWithdraw", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
    async loadWithdrawHTLCRedeemEvents(fromBlock, toBlock) {
        return await this._withdrawContract.getPastEvents("LogHTLCWithdraw", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
    async redeem(contractId, secret, receiver) {
        let gas;
        try {
            gas = await this._depositContract.methods.withdraw(contractId, secret).estimateGas({
                from: receiver,
            });
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw new Errors.RedeemUnexpectedError(contractId, e.message);
        }
        const tx = {
            from: receiver,
            to: this._depositContract.options.address,
            gas,
            data: this._depositContract.methods.withdraw(contractId, secret).encodeABI(),
        };
        const signedTx = await this._web3.eth.accounts.signTransaction(tx, config_1.default.eth.private_key);
        try {
            const result = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return result.transactionHash;
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw new Errors.RedeemUnexpectedError(contractId, e.message);
        }
    }
    async getTransactionReceipt(txHash) {
        return await this._web3.eth.getTransactionReceipt(txHash);
    }
    getAsset() {
        return (0, immutable_1.Map)({ precision: 18 });
    }
    async getGasPrice() {
        return await this._web3.eth.getGasPrice();
    }
    async createWithdrawHTLC(receiver, hashlock, timelock, amount) {
        let gas;
        try {
            gas = await this._withdrawContract.methods.newContract(receiver, hashlock, timelock).estimateGas({
                from: config_1.default.eth.receiver,
                value: amount,
            });
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw new Errors.ErrorEstimatingGas(receiver, e.message);
        }
        const tx = {
            from: config_1.default.eth.receiver,
            to: this._withdrawContract.options.address,
            gas,
            value: amount,
            data: this._withdrawContract.methods.newContract(receiver, hashlock, timelock).encodeABI(),
        };
        const signedTx = await this._web3.eth.accounts.signTransaction(tx, config_1.default.eth.private_key);
        try {
            const result = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return result.transactionHash;
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw new Errors.CreateWithdrawContractUnexpactedError(receiver, e.message);
        }
    }
    async refund(contractId) {
        let gas;
        try {
            gas = await this._withdrawContract.methods.refund(contractId).estimateGas({
                from: config_1.default.eth.receiver,
            });
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            if (e.message.indexOf("already refunded") > -1) {
                return "ALREADY_REFUNDED";
            }
            throw new Errors.RefundUnexpectedError(contractId, e.message);
        }
        const tx = {
            from: config_1.default.eth.receiver,
            to: config_1.default.eth.withdraw_contract_address,
            gas,
            data: this._withdrawContract.methods.refund(contractId).encodeABI(),
        };
        const signedTx = await this._web3.eth.accounts.signTransaction(tx, config_1.default.eth.private_key);
        try {
            const result = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return result.transactionHash;
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw new Errors.RefundUnexpectedError(contractId, e.message);
        }
    }
    async setFee(fee) {
        let gas;
        try {
            gas = await this._depositContract.methods.setFee(fee).estimateGas({
                from: config_1.default.eth.receiver,
            });
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw e;
        }
        const tx = {
            from: config_1.default.eth.receiver,
            to: config_1.default.eth.deposit_contract_address,
            gas,
            data: this._depositContract.methods.setFee(fee).encodeABI(),
        };
        const signedTx = await this._web3.eth.accounts.signTransaction(tx, config_1.default.eth.private_key);
        try {
            const result = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return result.transactionHash;
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw e;
        }
    }
    async getFee() {
        try {
            const result = await this._depositContract.methods.getFee().call({
                from: config_1.default.eth.deposit_contract_address,
            });
            return result;
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Errors.ConnectionError();
            }
            throw e;
        }
    }
    async loadTx(txHash) {
        return await this._web3.eth.getTransaction(txHash);
    }
    async loadBlock(blockNumber) {
        return await this._web3.eth.getBlock(blockNumber);
    }
    async loadWithdrawHTLCRefundEvents(fromBlock, toBlock) {
        return await this._withdrawContract.getPastEvents("LogHTLCRefund", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
    async loadDepositHTLCRefundEvents(fromBlock, toBlock) {
        return await this._depositContract.getPastEvents("LogHTLCRefund", {
            fromBlock: fromBlock,
            toBlock,
        });
    }
};
EthereumRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EthereumRepository);
exports.default = EthereumRepository;
//# sourceMappingURL=EthereumRepository.js.map