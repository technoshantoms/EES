"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WalletApi_1 = __importDefault(require("../../../../../api/WalletApi"));
const Facade_1 = require("../../../../Proposal/Facade");
class CreateProposalHandler {
    async execute(command) {
        const transaction = WalletApi_1.default.new_transaction();
        transaction.add_type_operation("committee_member_update_global_parameters", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            new_parameters: this.parameterMapToObject(command.parameters)
        });
        return await (0, Facade_1.createProposal)(transaction, command.expirationTime, this.reviewPeriod(command.parameters));
    }
    parameterMapToObject(parameters) {
        const objectParameters = {};
        parameters.forEach(parameter => {
            parameter = parameter;
            const name = parameter.name;
            if (parameter.isLink()) {
                objectParameters[name] = parameter.linkValue;
            }
            if (parameter.isNormal()) {
                const value = parameter.isModified()
                    ? parameter.newValue
                    : parameter.value;
                objectParameters[name] = value;
            }
            if (parameter.isGroup()) {
                objectParameters[name] = this.parameterMapToObject(parameter.children);
            }
        });
        return objectParameters;
    }
    reviewPeriod(parameters) {
        const reviewPeriodParameter = parameters.get("committee_proposal_review_period");
        return reviewPeriodParameter.value;
    }
}
exports.default = CreateProposalHandler;
//# sourceMappingURL=CreateProposalHandler.js.map