"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const moment_1 = __importDefault(require("moment"));
const Proposal_1 = __importDefault(require("../Domain/Proposal"));
const Parameter_1 = __importDefault(require("../Domain/Parameter"));
const Operation_1 = __importDefault(require("../Domain/Operation"));
const Fee_1 = __importDefault(require("../Domain/Fee"));
const UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID = 27;
class Factory {
    fromBlockchain(blockchainProposal, accountId) {
        const operation = blockchainProposal.proposed_transaction.operations[0];
        if (operation[0] != UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID) {
            throw new Error("Invalid proposed operation id");
        }
        const currentFees = operation[1].new_parameters.current_fees;
        const proposal = new Proposal_1.default(blockchainProposal.id, this.transformParameters(operation[1].new_parameters), this.transformCurrentFees(currentFees.parameters), (0, moment_1.default)(blockchainProposal.expiration_time), (0, moment_1.default)(blockchainProposal.review_period_time));
        if (blockchainProposal.available_active_approvals.includes(accountId)) {
            proposal.setVoted();
        }
        return proposal;
    }
    transformParameters(newParameters) {
        const parameters = (0, immutable_1.Set)().asMutable();
        for (const newParameterName in newParameters) {
            if (typeof newParameters[newParameterName] == "object") {
                continue;
            }
            const newParameterValue = newParameters[newParameterName];
            const parameter = Parameter_1.default.create(newParameterName, newParameterValue);
            parameters.add(parameter);
        }
        return parameters.asImmutable();
    }
    transformCurrentFees(blockchainOperations) {
        const operations = (0, immutable_1.Set)().asMutable();
        for (const blockchainOperation of blockchainOperations) {
            const blockchainFees = blockchainOperation[1];
            const fees = [];
            for (const blockchainFeeCode in blockchainFees) {
                const fee = Fee_1.default.create(blockchainFeeCode, blockchainFees[blockchainFeeCode]);
                fees.push(fee);
            }
            const operation = Operation_1.default.create(blockchainOperation[0], fees);
            operations.add(operation);
        }
        return operations;
    }
}
exports.default = new Factory();
//# sourceMappingURL=Factory.js.map