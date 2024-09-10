import { CommandRunner } from "nest-commander";
import ConfirmDepositExternalContractRedeemedHandler from "context/Application/Command/ExternalBlockchain/ConfirmDepositExternalContractRedeemed/ConfirmDepositExternalContractRedeemedHandler";
import QueueInterface from "context/Queue/QueueInterface";
export declare class ExternalContractRedeemWorker extends CommandRunner {
    private queue;
    private handler;
    constructor(queue: QueueInterface, handler: ConfirmDepositExternalContractRedeemedHandler);
    run(): Promise<void>;
}
