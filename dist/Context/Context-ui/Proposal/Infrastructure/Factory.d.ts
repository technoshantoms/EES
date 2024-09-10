import FactoryInterface from "../Domain/FactoryInterface";
import Proposal from "../Domain/Proposal";
import { ProposalTypes } from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;
declare class Factory implements FactoryInterface {
    fromBlockchain(blockchainProposal: ProposalBlockchainType, accountId: string): Proposal;
    private transformParameters;
    private transformCurrentFees;
}
declare const _default: Factory;
export default _default;
