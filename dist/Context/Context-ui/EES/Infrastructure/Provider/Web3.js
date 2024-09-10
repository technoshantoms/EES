"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const CreateHtlcResponse_1 = __importDefault(require("./CreateHtlcResponse"));
const DepositHashedTimelock_json_1 = __importDefault(require("../../../../assets/abi/DepositHashedTimelock.json"));
class Web3Provider {
    async create(htlc) {
        const web3 = new web3_1.default(window.ethereum);
        const contractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
        const receiver = "0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E";
        const contract = new web3.eth.Contract(DepositHashedTimelock_json_1.default, contractAddress);
        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(receiver, htlc.hash, htlc.timeout)
                .send({
                from: htlc.fromAddress,
                value: htlc.amount
            })
                .on("transactionHash", (hash) => {
            })
                .on("confirmation", (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    resolve(new CreateHtlcResponse_1.default(true, receipt.transactionHash));
                }
            })
                .on("receipt", function (receipt) {
            })
                .on("error", function (error, receipt) {
                reject(new CreateHtlcResponse_1.default(false, ""));
            });
        });
    }
}
exports.default = Web3Provider;
//# sourceMappingURL=Web3.js.map