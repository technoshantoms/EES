import { CommandRunner } from "nest-commander";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import DepositInternalContractRefundHandler from "context/Application/Command/InternalBlockchain/DepositInternalContractRefund/DepositInternalContractRefundHandler";
interface MonitorDepositInternalContractRefundedOptions {
    interval: number;
}
export declare class MonitorDepositInternalContractRefunded extends CommandRunner {
    private readonly depositRepository;
    private readonly depositInternalContractRefundHandler;
    constructor(depositRepository: DepositRepositoryInterface, depositInternalContractRefundHandler: DepositInternalContractRefundHandler);
    run(passedParam: string[], options: MonitorDepositInternalContractRefundedOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
