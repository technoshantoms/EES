export default class WithdrawTransaction {
    transactionId: string;
    id: string | undefined;
    blockNumber: number | undefined;
    transactionInBlock: number | undefined;
    transferId: string | undefined;
    transferReceiver: string | undefined;
    transferSender: string | undefined;
    htlcCreateId: string | undefined;
    htlcId: string | undefined;
    htlcCreateReceiver: string | undefined;
    htlcCreateSender: string | undefined;
    denormalizedAmount: string | undefined;
    htlcCreateAssetId: string | undefined;
    hashLock: string | undefined;
    hashMethod: number | undefined;
    timeLock: number | undefined;
    constructor(transactionId: string);
}
