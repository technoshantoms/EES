import RepositoryInterface from "../Domain/RepositoryInterface";
import { ProposalTypes } from "../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ProposalCreateType = ProposalTypes.ProposalCreateType;
declare class BlockchainRepository implements RepositoryInterface {
    create(proposal: ProposalCreateType): Promise<void>;
    loadAll(): Promise<ProposalsType>;
    vote(proposalId: string): Promise<void>;
    revokeVote(proposalId: string): Promise<void>;
}
declare const _default: BlockchainRepository;
export default _default;
