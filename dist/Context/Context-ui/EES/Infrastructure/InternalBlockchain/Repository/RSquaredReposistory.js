"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rsquared_js_ws_1 = require("@r-squared/rsquared-js-ws");
const PrivateKeyStore_1 = __importDefault(require("../../../../../stores/PrivateKeyStore"));
const Contract_1 = __importDefault(require("../../../Domain/InternalBlockchain/Contract"));
const rsquared_js_1 = require("@r-squared/rsquared-js");
const WalletDb_1 = __importDefault(require("../../../../../stores/WalletDb"));
const Memo_1 = __importDefault(require("../Memo"));
const AssetNormalizer_1 = __importDefault(require("../../AssetNormalizer"));
const PREIMAGE_HASH_CIPHER_SHA256 = 2;
const PREIMAGE_LENGTH = 32;
class RSquaredRepository {
    constructor(memo, normalizer) {
        this.memo = memo;
        this.normalizer = normalizer;
    }
    static create() {
        return new RSquaredRepository(new Memo_1.default(), new AssetNormalizer_1.default());
    }
    async loadContractsByAccount(account) {
        const rsquaredContracts = await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_htlc_by_to", [account, "1.16.0", 100]);
        const contracts = [];
        for (const contract of rsquaredContracts) {
            const { text } = PrivateKeyStore_1.default.decodeMemo(contract.memo);
            contracts.push(new Contract_1.default(contract.id, text));
        }
        return contracts;
    }
    async withdraw(settings, session) {
        const transactionBuilder = new rsquared_js_1.TransactionBuilder();
        const rsquaredAsset = await this.getAsset(settings.rqethAssetSymbol);
        const internalAccount = await (0, rsquared_js_1.FetchChain)("getAccount", session.internalAccountName);
        const eesAccount = await (0, rsquared_js_1.FetchChain)("getAccount", settings.eesAccountName);
        const withdrawalFeeAsset = await this.getAsset(session.withdrawalFeeCurrency);
        const transactionFeeAsset = await this.getAsset(session.transactionFeeCurrency);
        transactionBuilder.add_type_operation("transfer", {
            fee: {
                amount: 0,
                asset_id: transactionFeeAsset.get("id")
            },
            from: internalAccount.get("id"),
            to: eesAccount.get("id"),
            amount: {
                amount: this.normalizer.denormalize(session.withdrawalFeeAmount, withdrawalFeeAsset),
                asset_id: withdrawalFeeAsset.get("id")
            }
        });
        transactionBuilder.add_type_operation("htlc_create", {
            from: internalAccount.get("id"),
            to: eesAccount.get("id"),
            fee: {
                amount: 0,
                asset_id: transactionFeeAsset.get("id")
            },
            amount: {
                amount: this.normalizer.denormalize(session.value, rsquaredAsset),
                asset_id: rsquaredAsset.get("id")
            },
            preimage_hash: [PREIMAGE_HASH_CIPHER_SHA256, session.hashLock],
            preimage_size: PREIMAGE_LENGTH,
            claim_period_seconds: settings.withdrawTimeLock
        });
        await WalletDb_1.default.process_transaction(transactionBuilder, null, true);
        if (transactionBuilder.ref_block_num === 0) {
            throw new Error("Error creating withdraw contract.");
        }
    }
    async getICOBalanceObject(ethAddress) {
        return await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_ico_balance_objects", [[ethAddress]]);
    }
    async icoBalanceClaim(balanceObject, ethSign, publicKey, account) {
        const internalAccount = await (0, rsquared_js_1.FetchChain)("getAccount", account);
        const transactionBuilder = new rsquared_js_1.TransactionBuilder();
        transactionBuilder.add_type_operation("ico_balance_claim", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            balance_to_claim: balanceObject.id,
            deposit_to_account: internalAccount.get("id"),
            eth_address: balanceObject.eth_address,
            eth_pub_key: publicKey,
            eth_sign: ethSign
        });
        await WalletDb_1.default.process_transaction(transactionBuilder, null, true);
        if (transactionBuilder.ref_block_num === 0) {
            throw new Error("Error claiming ICO balance.");
        }
    }
    getPrivateKey(account) {
        const publicKey = this.memo.getPublicKey(account);
        return WalletDb_1.default.getPrivateKey(publicKey);
    }
    async getAsset(currency) {
        return await (0, rsquared_js_1.FetchChain)("getAsset", currency);
    }
}
exports.default = RSquaredRepository;
//# sourceMappingURL=RSquaredReposistory.js.map