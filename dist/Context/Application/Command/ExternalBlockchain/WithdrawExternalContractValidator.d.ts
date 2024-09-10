import AbstractValidator from "context/Domain/Validation/AbstractValidator";
import Contract from "context/ExternalBlockchain/Contract";
export default class WithdrawExternalContractValidator extends AbstractValidator {
    private externalContract;
    constructor(externalContract: Contract);
    validate(): void;
    private validateSender;
    private validateValue;
    private validateWithdrawn;
    private validateRefunded;
    private validatePreimage;
}
