import { CommandRunner } from "nest-commander";
import CreateWithdrawalExternalContractHandler from "context/Application/Command/ExternalBlockchain/CreateWithdrawalExternalContract/CreateWithdrawalExternalContractHandler";
import QueueInterface from "context/Queue/QueueInterface";
export declare class WorkerCreateWithdrawalExternalContract extends CommandRunner {
    private readonly messenger;
    private readonly handler;
    constructor(messenger: QueueInterface, handler: CreateWithdrawalExternalContractHandler);
    run(passedParam: string[]): Promise<void>;
}
