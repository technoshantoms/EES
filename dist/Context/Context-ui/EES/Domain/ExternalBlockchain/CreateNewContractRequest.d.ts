export default class CreateNewContractRequest {
    private _senderAddress;
    private _contractAddress;
    private _receiver;
    private _amount;
    private _hashLock;
    private _timeLock;
    constructor(_senderAddress: string, _contractAddress: string, _receiver: string, _amount: string, _hashLock: string, _timeLock: number);
    get senderAddress(): string;
    get contractAddress(): string;
    get receiver(): string;
    get amount(): string;
    get hashLock(): string;
    get timeLock(): number;
}
