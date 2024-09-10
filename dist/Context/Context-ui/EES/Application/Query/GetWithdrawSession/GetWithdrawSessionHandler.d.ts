import GetWithdrawSession from "./GetWithdrawSession";
import Session from "../../../Domain/Withdraw/WithdrawSession";
import { Result } from "../../../../Core/Logic/Result";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import { UseCaseError } from "../../../../Core/Logic/AppError";
export default class GetWithdrawSessionHandler {
    private _sessionRepository;
    constructor(_sessionRepository: SessionRepositoryInterface);
    execute(query: GetWithdrawSession): Promise<Result<UseCaseError, Session>>;
}
