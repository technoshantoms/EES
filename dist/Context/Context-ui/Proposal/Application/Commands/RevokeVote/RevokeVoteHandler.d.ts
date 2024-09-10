import RevokeVote from "./RevokeVote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";
export default class RevokeVoteHandler {
    private repository;
    constructor(repository: RepositoryInterface);
    execute(command: RevokeVote): Promise<Result<AppError, Proposal>>;
}
