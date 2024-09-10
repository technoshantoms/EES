"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
const AppError_1 = require("../../../../Core/Logic/AppError");
class VoteHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const proposal = command.proposal;
        if (undefined === proposal) {
            return Result_1.Failure.create(new AppError_1.AppError("proposal is not found"));
        }
        try {
            await this.repository.vote(proposal.id);
        }
        catch (error) {
            return Result_1.Failure.create(new AppError_1.AppError(error));
        }
        proposal.setVoted();
        return Result_1.Success.create(proposal);
    }
}
exports.default = VoteHandler;
//# sourceMappingURL=VoteHandler.js.map