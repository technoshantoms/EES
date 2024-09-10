import { UseCase } from "context/Core/Domain/UseCase";
import ConfirmWithdrawProcessed from "context/Application/Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessed";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import Setting from "context/Setting/Setting";
import NotifierInterface from "context/Notifier/NotifierInterface";
import { ProcessWithdrawExternalContractRefund } from "context/Application/Command/ExternalBlockchain/ProcessWithdrawExternalContractRefund/ProcessWithdrawExternalContractRefund";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export declare class ProcessWithdrawExternalContractRefundHandler implements UseCase<ConfirmWithdrawProcessed, void> {
    private readonly withdrawRepository;
    private readonly externalBlockchain;
    private readonly setting;
    private readonly notifier;
    constructor(withdrawRepository: WithdrawRepositoryInterface, externalBlockchain: ExternalBlockchain, setting: Setting, notifier: NotifierInterface);
    execute(command: ProcessWithdrawExternalContractRefund): Promise<void>;
}
