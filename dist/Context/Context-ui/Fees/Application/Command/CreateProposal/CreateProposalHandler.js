"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WalletApi_1 = __importDefault(require("../../../../../api/WalletApi"));
const Facade_1 = require("../../../../Proposal/Facade");
const Facade_2 = require("../../../../NetworkParameters/Facade");
class CreateProposalHandler {
    constructor(blockchainTypeTransformer) {
        this.blockchainTypeTransformer = blockchainTypeTransformer;
    }
    async execute(command) {
        const transaction = WalletApi_1.default.new_transaction();
        const newParameters = await this.getParameters(command.operations);
        transaction.add_type_operation("committee_member_update_global_parameters", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            new_parameters: newParameters
        });
        return await (0, Facade_1.createProposal)(transaction, command.expirationTime, this.reviewPeriod(newParameters));
    }
    async getParameters(operations) {
        const blockchainOperations = this.blockchainTypeTransformer.transform(operations);
        const parameters = await (0, Facade_2.loadAllRawParameters)();
        parameters.current_fees.parameters = blockchainOperations;
        return parameters;
    }
    reviewPeriod(parameters) {
        return parameters.committee_proposal_review_period;
    }
}
exports.default = CreateProposalHandler;
//# sourceMappingURL=CreateProposalHandler.js.map