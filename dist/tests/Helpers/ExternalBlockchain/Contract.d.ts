import ExternalHtlcContract from "context/ExternalBlockchain/Contract";
interface ContractParams {
    contractId?: string;
    sender?: string;
    receiver?: string;
    value?: string;
    hashLock?: string;
    timeLock?: number;
    withdrawn?: boolean;
    refunded?: boolean;
    preimage?: string;
}
export declare function createContract(params?: ContractParams): ExternalHtlcContract;
export {};
