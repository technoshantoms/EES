export default class CreateHtlcResponse {
    private status;
    private _txHash;
    constructor(status: boolean, _txHash: string);
    isSuccess(): boolean;
    get txHash(): string;
}
