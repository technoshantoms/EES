import SuccessResponse from "../Response/SuccessResponse";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
interface Request {
    sessionIds: string[];
}
export default class GetDepositsStatusesController {
    private _repository;
    constructor(_repository: DepositRepositoryInterface);
    check(request: Request): Promise<SuccessResponse>;
}
export {};
