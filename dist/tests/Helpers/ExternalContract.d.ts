import ExternalContract from "context/Domain/ExternalContract";
interface Params {
    id?: string;
    timeLock?: number;
    txHash?: string;
}
export declare function createExternalContract(params?: Params): ExternalContract;
export {};
