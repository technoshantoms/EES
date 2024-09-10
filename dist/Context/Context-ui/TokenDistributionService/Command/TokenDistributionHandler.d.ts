import TokenDistributionRequest from "./TokenDistributionRequest";
import InternalBlockchainRepositoryInterface from "../../EES/Domain/InternalBlockchain/RepositoryInterface";
export default class TokenDistributionHandler {
    private internalBlockchainRepository;
    constructor(internalBlockchainRepository: InternalBlockchainRepositoryInterface);
    execute(command: TokenDistributionRequest): Promise<void>;
    static create(): TokenDistributionHandler;
    private monitorBalance;
    private getCurrentBalance;
}
