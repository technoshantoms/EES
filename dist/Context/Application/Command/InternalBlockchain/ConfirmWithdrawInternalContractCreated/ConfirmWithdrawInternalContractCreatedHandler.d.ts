import { UseCase } from "context/Core/Domain/UseCase";
import ConfirmWithdrawInternalContractCreated from "./ConfirmWithdrawInternalContractCreated";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import WithdrawRequestRepositoryInterface from "context/Domain/WithdrawRequestRepositoryInterface";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import AssetNormalizer from "context/Infrastructure/AssetNormalizer";
export default class ConfirmWithdrawInternalContractCreatedHandler implements UseCase<ConfirmWithdrawInternalContractCreated, void> {
    private readonly withdrawRepository;
    private readonly withdrawRequestRepository;
    private readonly internalBlockchain;
    private readonly assetNormalizer;
    constructor(withdrawRepository: WithdrawRepositoryInterface, withdrawRequestRepository: WithdrawRequestRepositoryInterface, internalBlockchain: InternalBlockchain, assetNormalizer: AssetNormalizer);
    execute(command: ConfirmWithdrawInternalContractCreated): Promise<void>;
    private validateTransaction;
}
