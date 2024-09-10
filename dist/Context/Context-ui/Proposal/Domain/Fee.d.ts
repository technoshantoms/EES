export default class Fee {
    private _code;
    private _value;
    private _networkValue;
    private _changed;
    constructor(_code: string, _value: number);
    get code(): string;
    get value(): number;
    get networkValue(): number | null;
    setNetworkValue(networkValue: number): void;
    get changed(): boolean;
    static create(code: string, value: number): Fee;
}
