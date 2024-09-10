import { UseCase } from "context/Core/Domain/UseCase";
import ProcessIncomingContractCreation from "context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/ProcessIncomingContractCreation";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import DepositRequestRepositoryInterface from "context/Domain/DepositRequestRepositoryInterface";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export default class ProcessIncomingContractCreationHandler implements UseCase<ProcessIncomingContractCreation, void> {
    private repository;
    private depositRequestRepository;
    private externalBlockchain;
    constructor(repository: DepositRepositoryInterface, depositRequestRepository: DepositRequestRepositoryInterface, externalBlockchain: ExternalBlockchain);
    execute(command: ProcessIncomingContractCreation): Promise<void>;
}
