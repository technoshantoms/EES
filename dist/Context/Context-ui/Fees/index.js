"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProposalHandler = exports.CreateProposal = exports.getChangedHandler = exports.GetChanged = exports.loadAllHandler = exports.LoadAll = void 0;
const BlockchainRepository_1 = __importDefault(require("./Infrastructure/BlockchainRepository"));
const operations_json_1 = __importDefault(require("./Domain/operations.json"));
const LoadAll_1 = __importDefault(require("./Application/Query/LoadAll/LoadAll"));
exports.LoadAll = LoadAll_1.default;
const LoadAllHandler_1 = __importDefault(require("./Application/Query/LoadAll/LoadAllHandler"));
const GetChanged_1 = __importDefault(require("./Application/Query/GetChanged/GetChanged"));
exports.GetChanged = GetChanged_1.default;
const GetChangedHandler_1 = __importDefault(require("./Application/Query/GetChanged/GetChangedHandler"));
const CreateProposal_1 = __importDefault(require("./Application/Command/CreateProposal/CreateProposal"));
exports.CreateProposal = CreateProposal_1.default;
const CreateProposalHandler_1 = __importDefault(require("./Application/Command/CreateProposal/CreateProposalHandler"));
const BlockchainTypeTransformer_1 = __importDefault(require("./Application/Command/CreateProposal/BlockchainTypeTransformer"));
const blockchainRepository = new BlockchainRepository_1.default(operations_json_1.default);
const loadAllHandler = new LoadAllHandler_1.default(blockchainRepository);
exports.loadAllHandler = loadAllHandler;
const getChangedHandler = new GetChangedHandler_1.default();
exports.getChangedHandler = getChangedHandler;
const blockchainTypeTransformer = new BlockchainTypeTransformer_1.default();
const createProposalHandler = new CreateProposalHandler_1.default(blockchainTypeTransformer);
exports.createProposalHandler = createProposalHandler;
//# sourceMappingURL=index.js.map