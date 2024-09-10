import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import Response from "./Response";
import ChainedHandlerCommand from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainedHandlerCommand";
export default class GetWithdrawLastRefundsHandler implements UseCase<ChainedHandlerCommand, Response> {
    private readonly externalBlockchain;
    constructor(externalBlockchain: ExternalBlockchain);
    execute(query: ChainedHandlerCommand): Promise<Response>;
}
