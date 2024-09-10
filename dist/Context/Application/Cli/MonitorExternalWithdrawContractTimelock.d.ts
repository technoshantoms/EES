import { CommandRunner } from "nest-commander";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import { ProcessWithdrawExternalContractRefundHandler } from "context/Application/Command/ExternalBlockchain/ProcessWithdrawExternalContractRefund/ProcessWithdrawExternalContractRefundHandler";
interface MonitorExternalWithdrawContractTimelockOptions {
    interval: number;
}
export declare class MonitorExternalWithdrawContractTimelock extends CommandRunner {
    private readonly processWithdrawExternalContractRefundHandler;
    private readonly withdrawRepository;
    constructor(processWithdrawExternalContractRefundHandler: ProcessWithdrawExternalContractRefundHandler, withdrawRepository: WithdrawRepositoryInterface);
    run(passedParam: string[], options: MonitorExternalWithdrawContractTimelockOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
