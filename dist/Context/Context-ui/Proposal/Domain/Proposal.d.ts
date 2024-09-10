import { Moment } from "moment";
import { ProposalTypes } from "../types";
import ParametersType = ProposalTypes.ParametersType;
import OperationsType = ProposalTypes.OperationsType;
export default class Proposal {
    private _id;
    private _parameters;
    private _operations;
    private _expirationDate;
    private _reviewPeriod;
    private _voted;
    constructor(_id: string, _parameters: ParametersType, _operations: OperationsType, _expirationDate: Moment, _reviewPeriod: Moment);
    get id(): string;
    get parameters(): ParametersType;
    get operations(): OperationsType;
    get expirationDate(): Moment;
    get reviewPeriod(): Moment;
    setVoted(): void;
    revokeVote(): void;
    get voted(): boolean;
}
