import { Set } from "immutable";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Proposal from "../Domain/Proposal";
import { ProposalTypes } from "../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ProposalCreateType = ProposalTypes.ProposalCreateType;
import ProposalsCreateType = ProposalTypes.ProposalsCreateType;
declare class StubRepository implements RepositoryInterface {
    private _addedItems;
    private _createdItems;
    private _votedProposalsId;
    private _revokeVotedProposalsId;
    add(proposal: Proposal): void;
    create(proposal: ProposalCreateType): boolean;
    get createdItems(): ProposalsCreateType;
    loadAll(): Promise<ProposalsType>;
    vote(proposalId: string): void;
    get votedProposalsId(): Set<string>;
    revokeVote(proposalId: string): void;
    get revokeVotedProposalsId(): Set<string>;
    clear(): void;
}
declare const _default: StubRepository;
export default _default;
