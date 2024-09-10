export default class BlockRange {
    private readonly _fromBlock;
    private readonly _toBlock;
    constructor(_fromBlock: number, _toBlock: number);
    get fromBlock(): number;
    get toBlock(): number;
}