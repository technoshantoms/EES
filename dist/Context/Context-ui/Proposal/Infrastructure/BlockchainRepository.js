"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const rsquared_js_ws_1 = require("@r-squared/rsquared-js-ws");
const rsquared_js_1 = require("@r-squared/rsquared-js");
const AccountStore_1 = __importDefault(require("../../../stores/AccountStore"));
const WalletApi_1 = __importDefault(require("../../../api/WalletApi"));
const WalletDb_1 = __importDefault(require("../../../stores/WalletDb"));
const Factory_1 = __importDefault(require("./Factory"));
class BlockchainRepository {
    async create(proposal) {
        let account = AccountStore_1.default.getState().currentAccount;
        account = rsquared_js_1.ChainStore.getAccount(account);
        const transaction = proposal.transaction;
        transaction.propose({
            fee_paying_account: account.get("id"),
            expiration_time: proposal.expirationTime,
            review_period_seconds: proposal.reviewPeriod
        });
        try {
            await WalletDb_1.default.process_transaction(transaction, null, true);
        }
        catch (e) {
            throw new Error("error while sending transaction");
        }
    }
    async loadAll() {
        let account = AccountStore_1.default.getState().currentAccount;
        account = rsquared_js_1.ChainStore.getAccount(account);
        const data = await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_proposed_global_parameters", [account.get("id")]);
        const proposals = (0, immutable_1.Set)().asMutable();
        for (const blockchainProposal of data) {
            proposals.add(Factory_1.default.fromBlockchain(blockchainProposal, account.get("id")));
        }
        return proposals;
    }
    async vote(proposalId) {
        let account = AccountStore_1.default.getState().currentAccount;
        account = rsquared_js_1.ChainStore.getAccount(account);
        const transaction = WalletApi_1.default.new_transaction();
        transaction.add_type_operation("proposal_update", {
            fee_paying_account: account.get("id"),
            proposal: proposalId,
            active_approvals_to_add: [account.get("id")]
        });
        await WalletDb_1.default.process_transaction(transaction, null, true);
    }
    async revokeVote(proposalId) {
        let account = AccountStore_1.default.getState().currentAccount;
        account = rsquared_js_1.ChainStore.getAccount(account);
        console.log("revokeVote", proposalId);
        const transaction = WalletApi_1.default.new_transaction();
        transaction.add_type_operation("proposal_update", {
            fee_paying_account: account.get("id"),
            proposal: proposalId,
            active_approvals_to_remove: [account.get("id")]
        });
        await WalletDb_1.default.process_transaction(transaction, null, true);
    }
}
exports.default = new BlockchainRepository();
//# sourceMappingURL=BlockchainRepository.js.map