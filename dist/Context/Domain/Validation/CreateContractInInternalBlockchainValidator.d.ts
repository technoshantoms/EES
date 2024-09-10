import AbstractValidator from "./AbstractValidator";
import Deposit from "context/Domain/Deposit";
export default class CreateContractInInternalBlockchainValidator extends AbstractValidator {
    private deposit;
    constructor(deposit: Deposit);
    validate(): void;
    private validateStatus;
    private validateTimeLock;
}