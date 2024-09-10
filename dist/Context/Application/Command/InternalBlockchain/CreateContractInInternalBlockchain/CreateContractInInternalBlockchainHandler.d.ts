import { UseCase } from "context/Core/Domain/UseCase";
import CreateContractInInternalBlockchain from "./CreateContractInInternalBlockchain";
import RepositoryInterface from "context/Domain/DepositRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import ConverterInterface from "context/Domain/ConverterInterface";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export default class CreateContractInInternalBlockchainHandler implements UseCase<CreateContractInInternalBlockchain, void> {
    private readonly repository;
    private readonly internalBlockchain;
    private readonly externalBlockchain;
    private readonly converter;
    private readonly normalizer;
    constructor(repository: RepositoryInterface, internalBlockchain: InternalBlockchain, externalBlockchain: ExternalBlockchain, converter: ConverterInterface, normalizer: AssetNormalizer);
    execute(command: CreateContractInInternalBlockchain): Promise<void>;
    private timeLock;
}
