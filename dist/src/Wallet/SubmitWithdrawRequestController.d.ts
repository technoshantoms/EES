import SuccessResponse from "../Response/SuccessResponse";
import SubmitWithdrawRequestHandler from "context/Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler";
interface Request {
    rsquaredAccount: string;
    amountToPayInRQETH: number;
    addressOfUserInEthereum: string;
    withdrawalFeeAmount: number;
    withdrawalFeeCurrency: string;
}
export default class SubmitWithdrawRequestController {
    private _submitWithdrawRequestHandler;
    constructor(_submitWithdrawRequestHandler: SubmitWithdrawRequestHandler);
    create(request: Request): Promise<SuccessResponse>;
}
export {};
