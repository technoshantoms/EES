import { Moment } from "moment";
export default class SubmitDepositRequest {
    private _rsquaredAccount;
    private _value;
    private _hashLock;
    private _timeLock;
    constructor(_rsquaredAccount: string, _value: string, _hashLock: string, _timeLock: Moment);
    get rsquaredAccount(): string;
    get value(): string;
    get hashLock(): string;
    get timeLock(): Moment;
}
