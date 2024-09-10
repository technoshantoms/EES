import Create from "./Create";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
export default class CreateHandler {
    private repository;
    constructor(repository: RepositoryInterface);
    execute(command: Create): Promise<Result<AppError, boolean>>;
}
