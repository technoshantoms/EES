import { CommandRunner } from "nest-commander";
import WithdrawRepositoryInterface from "context/Domain/WithdrawRepositoryInterface";
import ProcessWithdrawInternalContractRedeemHandler from "context/Application/Command/InternalBlockchain/ProcessWithdrawInternalContractRedeem/ProcessWithdrawInternalContractRedeemHandler";
interface ExecuteWithdrawInternalContractRedeemOptions {
    interval: number;
}
export declare class ExecuteWithdrawInternalContractRedeem extends CommandRunner {
    private readonly withdrawRepository;
    private readonly withdrawInternalContractRedeemHandler;
    constructor(withdrawRepository: WithdrawRepositoryInterface, withdrawInternalContractRedeemHandler: ProcessWithdrawInternalContractRedeemHandler);
    run(passedParam: string[], options: ExecuteWithdrawInternalContractRedeemOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
