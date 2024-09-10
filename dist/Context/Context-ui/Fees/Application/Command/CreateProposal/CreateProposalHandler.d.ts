import CreateProposal from "./CreateProposal";
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
import BlockchainTypeTransformer from "./BlockchainTypeTransformer";
export default class CreateProposalHandler {
    private blockchainTypeTransformer;
    constructor(blockchainTypeTransformer: BlockchainTypeTransformer);
    execute(command: CreateProposal): Promise<Result<AppError, boolean>>;
    private getParameters;
    private reviewPeriod;
}
