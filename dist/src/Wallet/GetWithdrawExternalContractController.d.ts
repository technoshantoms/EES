import SuccessResponse from "../Response/SuccessResponse";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
interface Request {
    sessionId: string;
}
export default class GetWithdrawExternalContractController {
    private _repository;
    constructor(_repository: WithdrawRepositoryInterface);
    check(request: Request): Promise<SuccessResponse>;
}
export {};
