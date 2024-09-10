import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import CreateWithdrawalExternalContract from "./CreateWithdrawalExternalContract";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import Withdraw from "context/Domain/Withdraw";
import WrappedEtherToEtherConverter from "context/Infrastructure/WrappedEtherToEtherConverter";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
export default class CreateWithdrawalExternalContractHandler implements UseCase<CreateWithdrawalExternalContract, void> {
    private withdrawRepository;
    private externalBlockchain;
    private internalBlockChain;
    private wrappedEtherToEtherConverter;
    private normalizer;
    constructor(withdrawRepository: WithdrawRepositoryInterface, externalBlockchain: ExternalBlockchain, internalBlockChain: InternalBlockchain, wrappedEtherToEtherConverter: WrappedEtherToEtherConverter, normalizer: AssetNormalizer);
    execute(command: CreateWithdrawalExternalContract): Promise<void>;
    getDenormalizedContractAmount(withdraw: Withdraw): Promise<string>;
    getDenormalizedGasPrice(): Promise<string>;
}
