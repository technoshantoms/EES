import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import ExternalWithdrawRedeemHandler from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/ExternalWithdrawRedeemHandler";
import GetWithdrawLastRedeemsHandler from "context/Application/Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastRedeemsHandler";
export default class MonitorExternalWithdrawRedeemsLink implements ChainedHandlerInterface {
    private getLastRedeemsHandler;
    private externalContractRedeemHandler;
    constructor(getLastRedeemsHandler: GetWithdrawLastRedeemsHandler, externalContractRedeemHandler: ExternalWithdrawRedeemHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
