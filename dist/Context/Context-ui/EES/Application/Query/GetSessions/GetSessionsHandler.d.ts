import GetSessions from "./GetSessions";
import Session from "../../../Domain/Deposit/Session";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import { Result } from "../../../../Core";
import { UseCaseError } from "../../../../Core/Logic/AppError";
export default class GetSessionsHandler {
    private sessionRepository;
    constructor(sessionRepository: SessionRepositoryInterface);
    execute(query: GetSessions): Promise<Result<UseCaseError, Session[]>>;
}
