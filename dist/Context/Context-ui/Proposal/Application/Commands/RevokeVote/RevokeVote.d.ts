import Proposal from "../../../Domain/Proposal";
export default class RevokeVote {
    private _proposal;
    constructor(_proposal: Proposal);
    get proposal(): Proposal;
}
