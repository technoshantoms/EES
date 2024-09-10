import ExternalContract from "../ExternalBlockchain/WithdrawContract";
import InternalContract from "../InternalBlockchain/Contract";
export declare enum STATUS {
    CREATED = 1,
    SUBMITTED_TO_INTERNAL_BLOCKCHAIN = 5,
    READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN = 10,
    REDEEMED = 15
}
export default class WithdrawSession {
    private _id;
    private _internalAccountName;
    private _value;
    private _hashLock;
    private _withdrawalFeeCurrency;
    private _withdrawalFeeAmount;
    private _transactionFeeCurrency;
    private _transactionFeeAmount;
    private _ethereumAddress;
    private _status;
    private _externalContract;
    private _internalContract;
    constructor(_id: string, _internalAccountName: string, _value: number, _hashLock: string, _withdrawalFeeCurrency: string, _withdrawalFeeAmount: number, _transactionFeeCurrency: string, _transactionFeeAmount: number, _ethereumAddress: string);
    get id(): string;
    get internalAccountName(): string;
    get value(): number;
    get hashLock(): string;
    get withdrawalFeeCurrency(): string;
    get withdrawalFeeAmount(): number;
    get transactionFeeCurrency(): string;
    get transactionFeeAmount(): number;
    get ethereumAddress(): string;
    get status(): number;
    get externalContract(): ExternalContract | null;
    get internalContract(): InternalContract | null;
    isCreated(): boolean;
    isSubmitted(): boolean;
    isReadyToSignInExternalBlockchain(): boolean;
    isRedeemed(): boolean;
    failedSubmittedInInternalBlockchain(): void;
    submittedInInternalBlockchain(): void;
    readyToSignInExternalBlockchain(externalContract: ExternalContract): void;
    redeem(txHash: string): void;
    static create(id: string, internalAccount: string, value: number, hashLock: string, withdrawalFeeCurrency: string, withdrawalFeeAmount: number, transactionFeeCurrency: string, transactionFeeAmount: number, ethereumAddress: string): WithdrawSession;
}
