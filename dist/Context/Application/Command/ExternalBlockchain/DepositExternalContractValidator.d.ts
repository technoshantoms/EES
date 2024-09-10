import AbstractValidator from "context/Domain/Validation/AbstractValidator";
import Contract from "context/ExternalBlockchain/Contract";
export default class DepositExternalContractValidator extends AbstractValidator {
    private externalContract;
    constructor(externalContract: Contract);
    validate(): void;
    private validateReceiver;
    validateTimeLock(): void;
    private validateValue;
    private validateWithdrawn;
    private validateRefunded;
    private validatePreimage;
    private validateSender;
}
