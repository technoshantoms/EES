import Fee from "./Fee";
export default class Operation {
    private _id;
    private _fees;
    constructor(_id: number, _fees: Fee[]);
    get id(): number;
    get changed(): boolean;
    get fees(): Fee[];
    static create(id: number, fees: Fee[]): Operation;
}
