export default class HTLC {
    private _fromAddress;
    private _amount;
    private _hash;
    private _timeout;
    constructor(_fromAddress: string, _amount: string, _hash: string, _timeout: number);
    get fromAddress(): string;
    get amount(): string;
    get hash(): string;
    get timeout(): number;
}
