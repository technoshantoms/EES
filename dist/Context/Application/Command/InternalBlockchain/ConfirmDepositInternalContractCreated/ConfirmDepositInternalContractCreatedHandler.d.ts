import { UseCase } from "context/Core/Domain/UseCase";
import ConfirmDepositInternalContractCreated from "./ConfirmDepositInternalContractCreated";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
export default class ConfirmDepositInternalContractCreatedHandler implements UseCase<ConfirmDepositInternalContractCreated, void> {
    private readonly depositRepository;
    constructor(depositRepository: DepositRepositoryInterface);
    execute(command: ConfirmDepositInternalContractCreated): Promise<void>;
}
