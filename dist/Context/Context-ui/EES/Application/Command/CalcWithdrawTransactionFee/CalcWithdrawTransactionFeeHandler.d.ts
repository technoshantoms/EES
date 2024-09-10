import CalcWithdrawTransactionFee from "./CalcWithdrawTransactionFee";
export default class CalcWithdrawTransactionFeeHandler {
    execute(command: CalcWithdrawTransactionFee): Promise<number>;
}
