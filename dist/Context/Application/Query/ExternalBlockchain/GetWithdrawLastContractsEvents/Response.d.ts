import { EventData } from "web3-eth-contract";
export default class Response {
    private readonly _fromBlock;
    private readonly _toBlock;
    private readonly _events;
    constructor(_fromBlock: number, _toBlock: number, _events: EventData[]);
    get fromBlock(): number;
    get toBlock(): number;
    get events(): EventData[];
}
