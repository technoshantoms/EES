import Proposal from "../../../Domain/Proposal";
export default class Vote {
    private _proposal;
    constructor(_proposal: Proposal);
    get proposal(): Proposal;
}
