export default class FeeValue {
    private _value;
    private _newValue;
    constructor(_value: number, _newValue: number | null);
    get value(): number;
    get newValue(): number | null;
    updated(): boolean;
    static create(value: number, newValue: number | null): FeeValue;
}
