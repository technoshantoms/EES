"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class StubRepository {
    constructor() {
        this._addedItems = (0, immutable_1.Set)().asMutable();
        this._createdItems = (0, immutable_1.Set)().asMutable();
        this._votedProposalsId = (0, immutable_1.Set)().asMutable();
        this._revokeVotedProposalsId = (0, immutable_1.Set)().asMutable();
    }
    add(proposal) {
        this._addedItems.add(proposal);
    }
    create(proposal) {
        this._createdItems = this._createdItems.add(proposal);
        return true;
    }
    get createdItems() {
        return this._createdItems;
    }
    loadAll() {
        return Promise.resolve(this._addedItems);
    }
    vote(proposalId) {
        this._votedProposalsId.add(proposalId);
    }
    get votedProposalsId() {
        return this._votedProposalsId;
    }
    revokeVote(proposalId) {
        this._revokeVotedProposalsId.add(proposalId);
    }
    get revokeVotedProposalsId() {
        return this._revokeVotedProposalsId;
    }
    clear() {
        this._addedItems = this._addedItems.clear();
        this._createdItems = this._createdItems.clear();
        this._votedProposalsId.clear();
        this._revokeVotedProposalsId.clear();
    }
}
exports.default = new StubRepository();
//# sourceMappingURL=StubRepository.js.map