import ChainedHandlerInterface from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerInterface";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
import ProcessWithdrawContractCreationHandler from "context/Application/Command/ExternalBlockchain/ProcessWithdrawContractCreation/ProcessWithdrawContractCreationHandler";
import GetWithdrawLastContractsHandler from "context/Application/Query/ExternalBlockchain/GetWithdrawLastContractsEvents/GetWithdrawLastContractsHandler";
export default class WithdrawContractsCreationsProcessingLink implements ChainedHandlerInterface {
    private getLastContractsHandler;
    private processWithdrawContractCreationHandler;
    constructor(getLastContractsHandler: GetWithdrawLastContractsHandler, processWithdrawContractCreationHandler: ProcessWithdrawContractCreationHandler);
    execute(command: ChainedHandlerCommand): Promise<void>;
}
