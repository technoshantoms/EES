import GetTransactionExplorerLink from "./GetTransactionExplorerLink";
import ExternalBlockchainRepositoryInterface from "../../../EES/Domain/ExternalBlockchain/RepositoryInterface";
export default class GetTransactionExplorerLinkHandler {
    private externalBlockchainRepository;
    constructor(externalBlockchainRepository: ExternalBlockchainRepositoryInterface);
    execute(request: GetTransactionExplorerLink): Promise<string>;
    static create(): GetTransactionExplorerLinkHandler;
}
