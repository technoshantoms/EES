import { Moment } from "moment";
import ExternalContract from "../ExternalBlockchain/DepositContract";
import InternalContract from "../InternalBlockchain/Contract";
export declare enum STATUS {
    CREATED = 1,
    PAID = 5,
    CREATED_INTERNAL_BLOCKCHAIN = 10,
    REDEEMED = 15,
    EXPIRED = 95,
    BURNED = 100,
    REFUNDED = 105,
    REFUNDED_IN_EXTERNAL_BLOCKCHAIN = 110
}
export default class Session {
    private _id;
    private _internalAccount;
    private _value;
    private _hashLock;
    private _timeLock;
    private _status;
    private _externalContract;
    private _internalContract;
    constructor(_id: string, _internalAccount: string, _value: string, _hashLock: string, _timeLock: Moment);
    get id(): string;
    get internalAccount(): string;
    get value(): string;
    get hashLock(): string;
    get timeLock(): Moment;
    get status(): number;
    get externalContract(): ExternalContract | null;
    get internalContract(): InternalContract | null;
    isCreated(): boolean;
    isPaid(): boolean;
    isReadyToRefund(): boolean;
    isExpired(): boolean;
    isCreatedInternalBlockchain(): boolean;
    isRedeemed(): boolean;
    pay(externalContract: ExternalContract): void;
    createdInternalBlockchain(internalContract: InternalContract): void;
    redeemed(): void;
    refundedInExternalBlockchain(): void;
    static create(id: string, internalAccount: string, value: string, hashLock: string, timeLock: Moment): Session;
    setStatus(status: STATUS): void;
}
