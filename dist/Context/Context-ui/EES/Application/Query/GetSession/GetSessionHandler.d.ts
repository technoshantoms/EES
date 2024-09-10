import GetSession from "./GetSession";
import Session from "../../../Domain/Deposit/Session";
import { Result } from "../../../../Core/Logic/Result";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import { UseCaseError } from "../../../../Core/Logic/AppError";
export default class GetSessionHandler {
    private _sessionRepository;
    constructor(_sessionRepository: SessionRepositoryInterface);
    execute(query: GetSession): Promise<Result<UseCaseError, Session>>;
}
