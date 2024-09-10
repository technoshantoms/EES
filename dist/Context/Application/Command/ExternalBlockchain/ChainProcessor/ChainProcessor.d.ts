import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import Setting from "context/Setting/Setting";
import IncomingContractsCreationsProcessingLink from "context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/IncomingContractsCreationsProcessingLink";
import MonitorExternalDepositRedeemsLink from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRedeem/MonitorExternalDepositRedeemsLink";
import WithdrawContractsCreationsProcessingLink from "context/Application/Command/ExternalBlockchain/ProcessWithdrawContractCreation/WithdrawContractsCreationsProcessingLink";
import MonitorExternalWithdrawRedeemsLink from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/MonitorExternalWithdrawRedeemsLink";
import MonitorExternalDepositRefundsLink from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRefund/MonitorExternalDepositRefundsLink";
import MonitorExternalWithdrawRefundsLink from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRefund/MonitorExternalWithdrawRefundsLink";
export default class ChainProcessor {
    private readonly externalBlockchain;
    private setting;
    private incomingContractsCreationsProcessingLink;
    private monitorExternalDepositRedeemLink;
    private withdrawContractsCreationsProcessingLink;
    private monitorExternalWithdrawRedeemsLink;
    private monitorExternalDepositRefundLink;
    private monitorExternalWithdrawRefundLink;
    private handlers;
    constructor(externalBlockchain: ExternalBlockchain, setting: Setting, incomingContractsCreationsProcessingLink: IncomingContractsCreationsProcessingLink, monitorExternalDepositRedeemLink: MonitorExternalDepositRedeemsLink, withdrawContractsCreationsProcessingLink: WithdrawContractsCreationsProcessingLink, monitorExternalWithdrawRedeemsLink: MonitorExternalWithdrawRedeemsLink, monitorExternalDepositRefundLink: MonitorExternalDepositRefundsLink, monitorExternalWithdrawRefundLink: MonitorExternalWithdrawRefundsLink);
    execute(range: ChainedHandlerCommand): Promise<void>;
}
