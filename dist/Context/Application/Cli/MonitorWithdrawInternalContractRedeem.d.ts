import { CommandRunner } from "nest-commander";
import GetLastWithdrawContractsHandler from "context/Application/Query/InternalBlockchain/GetLastWithdrawContracts/GetLastWithdrawContractsHandler";
import ConfirmWithdrawInternalContractRedeemHandler from "context/Application/Command/InternalBlockchain/ConfirmWithdrawInternalContractRedeem/ConfirmWithdrawInternalContractRedeemHandler";
interface MonitorWithdrawInternalContractRedeemOptions {
    interval: number;
}
export declare class MonitorWithdrawInternalContractRedeem extends CommandRunner {
    private readonly confirmWithdrawInternalContractRedeemHandler;
    private readonly getLastWithdrawContractsHandler;
    constructor(confirmWithdrawInternalContractRedeemHandler: ConfirmWithdrawInternalContractRedeemHandler, getLastWithdrawContractsHandler: GetLastWithdrawContractsHandler);
    run(passedParam: string[], options: MonitorWithdrawInternalContractRedeemOptions): Promise<void>;
    parseInterval(val: string): number;
    private process;
    private cycleProcess;
}
export {};
