import { Moment } from "moment";
import { NetworkParameters } from "../../../types";
import ParametersType = NetworkParameters.ParametersType;
export default class Create {
    private _parameters;
    private _expirationTime;
    private _reviewPeriod;
    constructor(_parameters: ParametersType, _expirationTime: Moment, _reviewPeriod?: Moment | null);
    get parameters(): ParametersType;
    get expirationTime(): Moment;
    get reviewPeriod(): Moment | null;
}
