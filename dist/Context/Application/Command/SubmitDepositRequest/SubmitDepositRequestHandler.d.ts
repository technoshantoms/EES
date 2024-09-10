import { UseCase } from "context/Core/Domain/UseCase";
import SubmitDepositRequest from "./SubmitDepositRequest";
import DepositRequestRepositoryInterface from "context/Domain/DepositRequestRepositoryInterface";
export default class SubmitDepositRequestHandler implements UseCase<SubmitDepositRequest, string> {
    private _repository;
    constructor(_repository: DepositRequestRepositoryInterface);
    execute(command: SubmitDepositRequest): Promise<string>;
}
