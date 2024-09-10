import { UseCase } from "context/Core/Domain/UseCase";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
import ConfirmWithdrawProcessed from "context/Application/Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessed";
import Setting from "context/Setting/Setting";
import NotifierInterface from "context/Notifier/NotifierInterface";
export default class ConfirmWithdrawProcessedHandler implements UseCase<ConfirmWithdrawProcessed, void> {
    private readonly withdrawRepository;
    private readonly internalBlockchain;
    private readonly normalizer;
    private readonly setting;
    private readonly notifier;
    private lastIrreversibleBlockNumber;
    constructor(withdrawRepository: WithdrawRepositoryInterface, internalBlockchain: InternalBlockchain, normalizer: AssetNormalizer, setting: Setting, notifier: NotifierInterface);
    execute(command: ConfirmWithdrawProcessed): Promise<void>;
    private isLastIrreversible;
}
