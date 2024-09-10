import AbstractValidator from "./../AbstractValidator";
import Withdraw from "context/Domain/Withdraw";
export default class ReadyToProcess extends AbstractValidator {
    private withdraw;
    constructor(withdraw: Withdraw);
    validate(): void;
    private validateStatus;
}
