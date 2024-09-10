export default class Contract {
    private readonly _id;
    private readonly _message;
    constructor(_id: string, _message: string);
    get id(): string;
    get message(): string;
}
