import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import GetDepositLastRefundsHandler from "context/Application/Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastRefundsHandler";
import ExternalDepositRefundHandler from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRefund/ExternalDepositRefundHandler";
export default class MonitorExternalDepositRefundsLink implements ChainedHandlerInterface {
    private getLastRefundsHandler;
    private externalContractRefundHandler;
    constructor(getLastRefundsHandler: GetDepositLastRefundsHandler, externalContractRefundHandler: ExternalDepositRefundHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
