import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import ProcessIncomingContractCreationHandler from "context/Application/Command/ExternalBlockchain/ProcessIncomingContractCreation/ProcessIncomingContractCreationHandler";
import GetDepositLastContractsHandler from "context/Application/Query/ExternalBlockchain/GetDepositLastContractsEvents/GetDepositLastContractsHandler";
export default class IncomingContractsCreationsProcessingLink implements ChainedHandlerInterface {
    private getLastContractsHandler;
    private processIncomingContractCreationHandler;
    constructor(getLastContractsHandler: GetDepositLastContractsHandler, processIncomingContractCreationHandler: ProcessIncomingContractCreationHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
