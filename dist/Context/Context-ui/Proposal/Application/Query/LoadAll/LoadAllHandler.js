"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoadAllHandler {
    constructor(repository, loadAllParameters, loadAllOperations) {
        this.repository = repository;
        this.loadAllParameters = loadAllParameters;
        this.loadAllOperations = loadAllOperations;
    }
    async execute(request) {
        const proposals = await this.repository.loadAll();
        const networkParameters = await this.loadAllParameters();
        const operations = await this.loadAllOperations();
        proposals.forEach(proposal => {
            proposal = proposal;
            this.checkChangedParameters(networkParameters, proposal.parameters);
            this.checkChangedOperations(operations, proposal.operations);
        });
        return proposals;
    }
    checkChangedParameters(networkParameters, proposalParameters) {
        proposalParameters.forEach(proposalParameter => {
            proposalParameter = proposalParameter;
            if (networkParameters.has(proposalParameter.name)) {
                proposalParameter.networkValue = networkParameters.get(proposalParameter.name).value;
            }
            else {
                proposalParameter.markAsNew();
            }
        });
    }
    checkChangedOperations(networkOperations, proposalOperations) {
        proposalOperations.forEach(proposalOperation => {
            proposalOperation = proposalOperation;
            const networkOperation = networkOperations[proposalOperation.id];
            if (!networkOperation) {
                return;
            }
            for (const fee of proposalOperation.fees) {
                if (!networkOperation.fees.has(fee.code)) {
                    continue;
                }
                const networkOperationFeeValue = networkOperation.fees.get(fee.code).value;
                if (fee.value !== networkOperationFeeValue) {
                    fee.setNetworkValue(networkOperationFeeValue);
                }
            }
        });
    }
}
exports.default = LoadAllHandler;
//# sourceMappingURL=LoadAllHandler.js.map