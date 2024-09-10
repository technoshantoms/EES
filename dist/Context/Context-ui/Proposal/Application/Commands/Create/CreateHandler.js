"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../Core/Logic/Result");
const AppError_1 = require("../../../../Core/Logic/AppError");
class CreateHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const proposal = {
            transaction: command.transaction,
            expirationTime: command.expirationTime.unix(),
            reviewPeriod: command.reviewPeriod
        };
        try {
            await this.repository.create(proposal);
        }
        catch (error) {
            return Result_1.Failure.create(new AppError_1.AppError(error));
        }
        return Result_1.Success.create(true);
    }
}
exports.default = CreateHandler;
//# sourceMappingURL=CreateHandler.js.map