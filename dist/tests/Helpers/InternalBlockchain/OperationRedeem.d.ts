import OperationRedeem from "context/InternalBlockchain/OperationRedeem";
interface Params {
    internalContractId?: string;
    secret?: string;
}
export declare function createOperationRedeem(params?: Params): OperationRedeem;
export {};
