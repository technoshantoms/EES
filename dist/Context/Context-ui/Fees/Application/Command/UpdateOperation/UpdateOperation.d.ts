import Operation from "../../../Domain/Operation";
export default class UpdateOperation {
    private _operation;
    private _feeCode;
    private _value;
    constructor(_operation: Operation, _feeCode: string, _value: number);
    get operation(): Operation;
    get feeCode(): string;
    get value(): number;
}
