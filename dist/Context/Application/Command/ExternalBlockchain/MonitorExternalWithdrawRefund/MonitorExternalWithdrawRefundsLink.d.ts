import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import GetWithdrawLastRefundsHandler from "context/Application/Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastRefundsHandler";
import ExternalWithdrawRefundHandler from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRefund/ExternalWithdrawRefundHandler";
export default class MonitorExternalWithdrawRefundsLink implements ChainedHandlerInterface {
    private getLastRefundsHandler;
    private externalContractRefundHandler;
    constructor(getLastRefundsHandler: GetWithdrawLastRefundsHandler, externalContractRefundHandler: ExternalWithdrawRefundHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
