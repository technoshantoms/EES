import { UseCase } from "context/Core/Domain/UseCase";
import SubmitWithdrawRequest from "./SubmitWithdrawRequest";
import WithdrawRequestRepositoryInterface from "context/Domain/WithdrawRequestRepositoryInterface";
export default class SubmitWithdrawRequestHandler implements UseCase<SubmitWithdrawRequest, string> {
    private _repository;
    constructor(_repository: WithdrawRequestRepositoryInterface);
    execute(command: SubmitWithdrawRequest): Promise<string>;
}
