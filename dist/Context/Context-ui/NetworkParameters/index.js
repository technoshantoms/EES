"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProposalHandler = exports.CreateProposal = exports.loadAllHandler = exports.LoadAll = void 0;
const BlockchainRepository_1 = __importDefault(require("./Infrastructure/BlockchainRepository"));
const parameters_json_1 = __importDefault(require("./Domain/parameters.json"));
const LoadAll_1 = __importDefault(require("./Application/Query/LoadAll/LoadAll"));
exports.LoadAll = LoadAll_1.default;
const LoadAllHandler_1 = __importDefault(require("./Application/Query/LoadAll/LoadAllHandler"));
const CreateProposal_1 = __importDefault(require("./Application/Commands/CreateProposal/CreateProposal"));
exports.CreateProposal = CreateProposal_1.default;
const CreateProposalHandler_1 = __importDefault(require("./Application/Commands/CreateProposal/CreateProposalHandler"));
const loadAllHandler = new LoadAllHandler_1.default(BlockchainRepository_1.default, parameters_json_1.default);
exports.loadAllHandler = loadAllHandler;
const createProposalHandler = new CreateProposalHandler_1.default();
exports.createProposalHandler = createProposalHandler;
//# sourceMappingURL=index.js.map