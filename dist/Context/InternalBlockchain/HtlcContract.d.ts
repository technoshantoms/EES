export default class HtlcContract {
    private _id;
    private _message;
    constructor(_id: string, _message: string);
    get id(): string;
    get message(): string;
    hasMessage(): boolean;
}
