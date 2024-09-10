import AggregateRoot from "../Core/Domain/AggregateRoot";
import NativeAccount from "./ValueObject/NativeAccount";
import HashLock from "./ValueObject/HashLock";
export default class DepositRequest extends AggregateRoot {
    private _nativeAccount;
    private _hashLock;
    private _status;
    constructor(_nativeAccount: NativeAccount, _hashLock: HashLock);
    get nativeAccount(): NativeAccount;
    get hashLock(): HashLock;
    get status(): number;
    static create(nativeAccount: NativeAccount, hashLock: HashLock): DepositRequest;
}
