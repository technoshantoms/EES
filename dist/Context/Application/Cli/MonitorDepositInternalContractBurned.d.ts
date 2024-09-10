import { CommandRunner } from "nest-commander";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import BurnedHandler from "context/Application/Command/InternalBlockchain/Confirm/Burned/BurnedHandler";
interface MonitorDepositInternalContractBurnedOptions {
    interval: number;
}
export declare class MonitorDepositInternalContractBurned extends CommandRunner {
    private readonly depositRepository;
    private readonly burnedHandler;
    constructor(depositRepository: DepositRepositoryInterface, burnedHandler: BurnedHandler);
    run(passedParam: string[], options: MonitorDepositInternalContractBurnedOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
