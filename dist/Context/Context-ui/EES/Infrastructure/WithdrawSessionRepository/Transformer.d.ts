import WithdrawSession from "../../Domain/Withdraw/WithdrawSession";
export interface ExternalContractJson {
    id: string;
    txHash: string | null;
}
export interface InternalContractJson {
    id: string;
}
export interface SessionJson {
    id: string;
    internalAccount: string;
    value: number;
    hashLock: string;
    withdrawalFeeCurrency: string;
    withdrawalFeeAmount: number;
    transactionFeeCurrency: string;
    transactionFeeAmount: number;
    ethereumAddress: string;
    status: number;
    externalContract?: ExternalContractJson;
    internalContract?: InternalContractJson;
}
declare class Transformer {
    transform(session: WithdrawSession): SessionJson;
    reverseTransform(sessionJson: SessionJson): WithdrawSession;
    setExternalContract(session: WithdrawSession, sessionJson: SessionJson): SessionJson;
    setInternalContract(session: WithdrawSession, sessionJson: SessionJson): SessionJson;
}
declare const _default: Transformer;
export default _default;
