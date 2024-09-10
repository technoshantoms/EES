import { CommandRunner } from "nest-commander";
import ConfirmWithdrawInternalContractCreatedHandler from "context/Application/Command/InternalBlockchain/ConfirmWithdrawInternalContractCreated/ConfirmWithdrawInternalContractCreatedHandler";
import GetLastWithdrawContractsHandler from "context/Application/Query/InternalBlockchain/GetLastWithdrawContracts/GetLastWithdrawContractsHandler";
interface MonitorWithdrawInternalContractCreatedOptions {
    interval: number;
}
export declare class MonitorWithdrawInternalContractCreated extends CommandRunner {
    private readonly confirmWithdrawInternalContractCreateHandler;
    private readonly getLastWithdrawContractsHandler;
    constructor(confirmWithdrawInternalContractCreateHandler: ConfirmWithdrawInternalContractCreatedHandler, getLastWithdrawContractsHandler: GetLastWithdrawContractsHandler);
    run(passedParam: string[], options: MonitorWithdrawInternalContractCreatedOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
