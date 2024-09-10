import SuccessResponse from "../Response/SuccessResponse";
interface Request {
    rsquaredAccount: string;
    hashLock: string;
}
export default class SubmitDepositRequestController {
    create(request: Request): Promise<SuccessResponse>;
}
export {};
