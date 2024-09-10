import AbstractValidator from "./../AbstractValidator";
import Withdraw from "context/Domain/Withdraw";
export default class WithdrawRefund extends AbstractValidator {
    private withdraw;
    constructor(withdraw: Withdraw);
    validate(): void;
    private validateStatus;
}
