type BlockchainType = "metamask" | "stub";
export default class MakeDeposit {
    private _blockchainType;
    private _senderAddress;
    private _sessionId;
    constructor(_blockchainType: BlockchainType, _senderAddress: string, _sessionId: string);
    get blockchainType(): BlockchainType;
    get senderAddress(): string;
    get sessionId(): string;
}
export {};
