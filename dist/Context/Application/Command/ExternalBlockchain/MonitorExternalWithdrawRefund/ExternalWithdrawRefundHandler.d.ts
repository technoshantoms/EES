import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ExternalWithdrawRefund from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRefund/ExternalWithdrawRefund";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
export default class ExternalWithdrawRefundHandler implements UseCase<ExternalWithdrawRefund, void> {
    private externalBlockchain;
    private withdrawRepository;
    constructor(externalBlockchain: ExternalBlockchain, withdrawRepository: WithdrawRepositoryInterface);
    execute(command: ExternalWithdrawRefund): Promise<void>;
}
