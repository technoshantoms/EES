export default class Fee {
    private _code;
    private _value;
    private _newValue;
    constructor(_code: string, _value: number);
    get code(): string;
    get value(): number;
    get newValue(): number | null;
    get updated(): boolean;
    update(newValue: number): void;
    static create(code: string, value: number): Fee;
}
