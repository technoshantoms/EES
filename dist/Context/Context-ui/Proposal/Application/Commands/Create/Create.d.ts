import { Moment } from "moment";
export default class Create {
    private _transaction;
    private _expirationTime;
    private _reviewPeriod;
    constructor(_transaction: unknown, _expirationTime: Moment, _reviewPeriod: number);
    get transaction(): unknown;
    get expirationTime(): Moment;
    get reviewPeriod(): number;
}
