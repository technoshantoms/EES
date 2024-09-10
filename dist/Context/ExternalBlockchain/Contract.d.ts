export default class Contract {
    private _contractId;
    private _sender;
    private _receiver;
    private _value;
    private _hashLock;
    private _timeLock;
    private _withdrawn;
    private _refunded;
    private _preimage;
    constructor(_contractId: string, _sender: string, _receiver: string, _value: string, _hashLock: string, _timeLock: number, _withdrawn: boolean, _refunded: boolean, _preimage: string);
    get contractId(): string;
    get sender(): string;
    get receiver(): string;
    get value(): string;
    get hashLock(): string;
    get timeLock(): number;
    get withdrawn(): boolean;
    get refunded(): boolean;
    get preimage(): string;
}
