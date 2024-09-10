import Session from "../../Domain/Deposit/Session";
export interface ExternalContractJson {
    txHash: string;
}
export interface InternalContractJson {
    id: string;
}
export interface SessionJson {
    id: string;
    internalAccount: string;
    value: string;
    hashLock: string;
    timeLock: number;
    status: number;
    externalContract?: ExternalContractJson;
    internalContract?: InternalContractJson;
}
declare class Transformer {
    transform(session: Session): SessionJson;
    reverseTransform(sessionJson: SessionJson): Session;
}
declare const _default: Transformer;
export default _default;
