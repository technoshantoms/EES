import CreateProposal from "./CreateProposal";
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
export default class CreateProposalHandler {
    execute(command: CreateProposal): Promise<Result<AppError, boolean>>;
    private parameterMapToObject;
    private reviewPeriod;
}
