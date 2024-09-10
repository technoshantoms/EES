import { CommandRunner } from "nest-commander";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import CheckInternalWithdrawalOperationHandler from "context/Application/Command/InternalBlockchain/CheckInternalWithdrawalOperation/CheckInternalWithdrawalOperationHandler";
interface FoundWithdrawInternalContractCreationOptions {
    interval: number;
}
export declare class FoundWithdrawInternalContractCreation extends CommandRunner {
    private readonly checkInternalWithdrawalOperationHandler;
    private readonly withdrawRepository;
    constructor(checkInternalWithdrawalOperationHandler: CheckInternalWithdrawalOperationHandler, withdrawRepository: WithdrawRepositoryInterface);
    run(passedParam: string[], options: FoundWithdrawInternalContractCreationOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
