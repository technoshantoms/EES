import { UseCase } from "context/Core/Domain/UseCase";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import WithdrawRequestRepositoryInterface from "context/Domain/WithdrawRequestRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import CheckInternalWithdrawalOperation from "context/Application/Command/InternalBlockchain/CheckInternalWithdrawalOperation/CheckInternalWithdrawalOperation";
import Withdraw from "context/Domain/Withdraw";
import { Map } from "immutable";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
export default class CheckInternalWithdrawalOperationHandler implements UseCase<CheckInternalWithdrawalOperation, void> {
    private readonly withdrawRepository;
    private readonly withdrawRequestRepository;
    private readonly internalBlockchain;
    private readonly normalizer;
    private readonly RQETHAssetSymbol;
    private lastIrreversibleBlockNumber;
    private eesAccountId;
    constructor(withdrawRepository: WithdrawRepositoryInterface, withdrawRequestRepository: WithdrawRequestRepositoryInterface, internalBlockchain: InternalBlockchain, normalizer: AssetNormalizer, RQETHAssetSymbol: string);
    execute(command: CheckInternalWithdrawalOperation): Promise<void>;
    checkHTLCOperation(htlcOperation: Map<string, any>, withdraw: Withdraw): Promise<void>;
    private checkTransferOperation;
    private checkLastIrreversible;
    private checkReceiver;
}
