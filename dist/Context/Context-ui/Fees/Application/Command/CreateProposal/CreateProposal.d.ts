import { Moment } from "moment";
import { Fees } from "../../../types";
import OperationsType = Fees.OperationsType;
export default class Create {
    private _operations;
    private _expirationTime;
    private _reviewPeriod;
    constructor(_operations: OperationsType, _expirationTime: Moment, _reviewPeriod?: Moment | null);
    get operations(): OperationsType;
    get expirationTime(): Moment;
    get reviewPeriod(): Moment | null;
}
