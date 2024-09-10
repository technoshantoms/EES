import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ProcessWithdrawContractCreation from "context/Application/Command/ExternalBlockchain/ProcessWithdrawContractCreation/ProcessWithdrawContractCreation";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
export default class ProcessWithdrawContractCreationHandler implements UseCase<ProcessWithdrawContractCreation, void> {
    private repository;
    private externalBlockchain;
    constructor(repository: WithdrawRepositoryInterface, externalBlockchain: ExternalBlockchain);
    execute(command: ProcessWithdrawContractCreation): Promise<void>;
}
