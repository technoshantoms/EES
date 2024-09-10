import { CommandRunner } from "nest-commander";
import ConfirmWithdrawExternalContractRedeemedHandler from "context/Application/Command/ExternalBlockchain/ConfirmWithdrawExternalContractRedeemed/ConfirmWithdrawExternalContractRedeemedHandler";
import QueueInterface from "context/Queue/QueueInterface";
export declare class WorkerWithdrawExternalContractRedeemed extends CommandRunner {
    private readonly messenger;
    private readonly handler;
    constructor(messenger: QueueInterface, handler: ConfirmWithdrawExternalContractRedeemedHandler);
    run(passedParam: string[]): Promise<void>;
}
