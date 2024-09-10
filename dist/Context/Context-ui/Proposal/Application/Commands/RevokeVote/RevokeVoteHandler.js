"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
const AppError_1 = require("../../../../Core/Logic/AppError");
class RevokeVoteHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const proposal = command.proposal;
        try {
            await this.repository.revokeVote(proposal.id);
        }
        catch (error) {
            return Result_1.Failure.create(new AppError_1.AppError(error));
        }
        proposal.revokeVote();
        return Result_1.Success.create(proposal);
    }
}
exports.default = RevokeVoteHandler;
//# sourceMappingURL=RevokeVoteHandler.js.map