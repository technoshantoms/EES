"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RSquaredReposistory_1 = __importDefault(require("../../EES/Infrastructure/InternalBlockchain/Repository/RSquaredReposistory"));
const eth_crypto_1 = __importDefault(require("eth-crypto"));
const web3_1 = __importDefault(require("web3"));
const AccountStore_1 = __importDefault(require("../../../stores/AccountStore"));
const rsquared_js_1 = require("@r-squared/rsquared-js");
class TokenDistributionHandler {
    constructor(internalBlockchainRepository) {
        this.internalBlockchainRepository = internalBlockchainRepository;
    }
    async execute(command) {
        const web3 = new web3_1.default(window.ethereum);
        const phrase = command.phrase;
        const secretMsgSignature = (await window.ethereum.request({
            method: "personal_sign",
            params: [web3.utils.utf8ToHex(phrase), command.ethAccount]
        }));
        const pubkeyEthCrypto = eth_crypto_1.default.recoverPublicKey(secretMsgSignature, web3.eth.accounts.hashMessage(phrase));
        const balanceObject = await this.internalBlockchainRepository.getICOBalanceObject(command.ethAccount.substring(2));
        const balance = await this.getCurrentBalance();
        setTimeout(() => {
            this.monitorBalance(balance);
        }, 1000);
        await this.internalBlockchainRepository.icoBalanceClaim(balanceObject[0], secretMsgSignature.substring(2), pubkeyEthCrypto, command.rsquaredAccount);
    }
    static create() {
        const internalRepository = RSquaredReposistory_1.default.create();
        return new TokenDistributionHandler(internalRepository);
    }
    async monitorBalance(startBalance) {
        console.log("monitoring balance");
        if ((await this.getCurrentBalance()) > startBalance) {
            location.assign("/token-distribution/done");
        }
        setTimeout(() => {
            this.monitorBalance(startBalance);
        }, 1000);
    }
    async getCurrentBalance() {
        const accountName = AccountStore_1.default.getState().currentAccount;
        const account = await rsquared_js_1.ChainStore.getAccount(accountName);
        const balances = account.get("balances").get("1.3.0");
        if (!balances)
            return 0;
        const internalBalanceObject = await rsquared_js_1.ChainStore.getObject(balances);
        if (!internalBalanceObject)
            return 0;
        return internalBalanceObject.get("balance");
    }
}
exports.default = TokenDistributionHandler;
//# sourceMappingURL=TokenDistributionHandler.js.map