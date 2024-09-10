import Setting from "context/Setting/Setting";
import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import GetLastBlocks from "context/Application/Query/ExternalBlockchain/GetLastBlocks/GetLastBlocks";
import Response from "./Response";
export default class GetLastBlocksHandler implements UseCase<GetLastBlocks, Response> {
    private readonly externalBlockchain;
    private setting;
    constructor(externalBlockchain: ExternalBlockchain, setting: Setting);
    execute(query: GetLastBlocks): Promise<Response>;
    saveLastBlockNumber(query: GetLastBlocks, blockNumber: number): Promise<void>;
    private getBlock;
    private getBlocks;
}
