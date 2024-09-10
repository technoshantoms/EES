import AbstractValidator from "./../AbstractValidator";
import Withdraw from "context/Domain/Withdraw";
export default class CreateWithdrawExternalContractValidator extends AbstractValidator {
    private withdraw;
    constructor(withdraw: Withdraw);
    validate(): void;
    private validateStatus;
    private validateTimelock;
}
