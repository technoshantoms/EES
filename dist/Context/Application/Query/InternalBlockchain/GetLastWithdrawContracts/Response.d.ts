import WithdrawTransaction from "context/InternalBlockchain/WithdrawTransaction";
export default class Response {
    private readonly _transactions;
    constructor(_transactions: WithdrawTransaction[]);
    get transactions(): WithdrawTransaction[];
}
