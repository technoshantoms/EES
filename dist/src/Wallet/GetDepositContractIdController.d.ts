import SuccessResponse from "../Response/SuccessResponse";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
interface Request {
    sessionId: string;
}
export default class GetDepositContractIdController {
    private _repository;
    constructor(_repository: DepositRepositoryInterface);
    check(request: Request): Promise<SuccessResponse>;
}
export {};
