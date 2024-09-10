import { CommandRunner } from "nest-commander";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export declare class GetFee extends CommandRunner {
    private readonly externalBlockchain;
    constructor(externalBlockchain: ExternalBlockchain);
    run(): Promise<void>;
}
