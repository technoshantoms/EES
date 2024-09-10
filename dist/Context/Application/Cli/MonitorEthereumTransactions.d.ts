import { CommandRunner } from "nest-commander";
import ChainProcessor from "context/Application/Command/ExternalBlockchain/ChainProcessor/ChainProcessor";
import GetLastBlocksHandler from "context/Application/Query/ExternalBlockchain/GetLastBlocks/GetLastBlocksHandler";
interface MonitorEthereumTransactionsOptions {
    blockNumber?: number;
    interval: number;
}
export declare class MonitorEthereumTransactions extends CommandRunner {
    private getLastBlocksHandler;
    private chainProcessor;
    constructor(getLastBlocksHandler: GetLastBlocksHandler, chainProcessor: ChainProcessor);
    run(passedParam: string[], options: MonitorEthereumTransactionsOptions): Promise<void>;
    parseBlockNumber(val: string): number;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
