import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import CreateProposal from "./Application/Commands/CreateProposal/CreateProposal";
import CreateProposalHandler from "./Application/Commands/CreateProposal/CreateProposalHandler";
declare const loadAllHandler: LoadAllHandler;
declare const createProposalHandler: CreateProposalHandler;
export { LoadAll, loadAllHandler };
export { CreateProposal, createProposalHandler };
