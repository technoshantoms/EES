import SuccessResponse from "../Response/SuccessResponse";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
interface Request {
    sessionId: string;
}
export default class CheckDepositSubmittedToInternalBlockchainController {
    private _repository;
    constructor(_repository: DepositRepositoryInterface);
    create(request: Request): Promise<SuccessResponse>;
}
export {};
