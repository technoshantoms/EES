import { UseCase } from "context/Core/Domain/UseCase";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
import ConverterInterface from "context/Domain/ConverterInterface";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ProcessWithdrawInternalContractRedeem from "context/Application/Command/InternalBlockchain/ProcessWithdrawInternalContractRedeem/ProcessWithdrawInternalContractRedeem";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
export default class ProcessWithdrawInternalContractRedeemHandler implements UseCase<ProcessWithdrawInternalContractRedeem, void> {
    private repository;
    private internalBlockchain;
    private externalBlockchain;
    private normalizer;
    private converter;
    constructor(repository: WithdrawRepositoryInterface, internalBlockchain: InternalBlockchain, externalBlockchain: ExternalBlockchain, normalizer: AssetNormalizer, converter: ConverterInterface);
    execute(command: ProcessWithdrawInternalContractRedeem): Promise<void>;
}
