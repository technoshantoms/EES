import { CommandRunner } from "nest-commander";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import ConfirmWithdrawProcessedHandler from "context/Application/Command/InternalBlockchain/ConfirmWithdrawProcessed/ConfirmWithdrawProcessedHandler";
interface MonitorWithdrawInternalContractRedeemProcessedOptions {
    interval: number;
}
export declare class MonitorWithdrawInternalContractRedeemProcessed extends CommandRunner {
    private readonly confirmWithdrawProcessedHandler;
    private readonly withdrawRepository;
    constructor(confirmWithdrawProcessedHandler: ConfirmWithdrawProcessedHandler, withdrawRepository: WithdrawRepositoryInterface);
    run(passedParam: string[], options: MonitorWithdrawInternalContractRedeemProcessedOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
