import InternalHtlcContract from "context/InternalBlockchain/HtlcContract";
interface Params {
    id?: string;
    externalId?: string;
}
export declare function createContract(params?: Params): InternalHtlcContract;
export {};
