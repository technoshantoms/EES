import { CommandRunner } from "nest-commander";
import EthereumRepository from "context/ExternalBlockchain/Repository/EthereumRepository";
export declare class SetFee extends CommandRunner {
    private readonly ethereumRepository;
    constructor(ethereumRepository: EthereumRepository);
    run(passedParam: string[]): Promise<void>;
}
