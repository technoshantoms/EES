import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import ExternalDepositRedeemHandler from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRedeem/ExternalDepositRedeemHandler";
import GetDepositLastRedeemsHandler from "context/Application/Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastRedeemsHandler";
export default class MonitorExternalDepositRedeemsLink implements ChainedHandlerInterface {
    private getLastRedeemsHandler;
    private externalContractRedeemHandler;
    constructor(getLastRedeemsHandler: GetDepositLastRedeemsHandler, externalContractRedeemHandler: ExternalDepositRedeemHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
