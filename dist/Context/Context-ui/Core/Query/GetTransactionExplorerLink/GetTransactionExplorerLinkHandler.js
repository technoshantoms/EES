"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const etherscan_link_1 = __importDefault(require("@metamask/etherscan-link"));
const Web3Repository_1 = __importDefault(require("../../../EES/Infrastructure/ExternalBlockchain/Web3Repository"));
class GetTransactionExplorerLinkHandler {
    constructor(externalBlockchainRepository) {
        this.externalBlockchainRepository = externalBlockchainRepository;
    }
    async execute(request) {
        var _a, _b;
        const chainId = await this.externalBlockchainRepository.getChainId();
        return etherscan_link_1.default.createExplorerLinkForChain((_b = (_a = request.session.externalContract) === null || _a === void 0 ? void 0 : _a.txHash) !== null && _b !== void 0 ? _b : "", "0x" + chainId.toString(16));
    }
    static create() {
        const externalBlockchainRepository = new Web3Repository_1.default();
        return new GetTransactionExplorerLinkHandler(externalBlockchainRepository);
    }
}
exports.default = GetTransactionExplorerLinkHandler;
//# sourceMappingURL=GetTransactionExplorerLinkHandler.js.map