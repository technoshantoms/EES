import Vote from "./Vote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";
export default class VoteHandler {
    private repository;
    constructor(repository: RepositoryInterface);
    execute(command: Vote): Promise<Result<AppError, Proposal>>;
}
