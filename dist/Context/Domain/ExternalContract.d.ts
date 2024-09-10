import UniqueEntityID from "context/Core/Domain/UniqueEntityID";
import Entity from "context/Core/Domain/Entity";
import HashLock from "context/Domain/ValueObject/HashLock";
import Address from "context/Domain/ValueObject/Address";
import TimeLock from "context/Domain/ValueObject/TimeLock";
export default class ExternalContract extends Entity {
    private _sender;
    private _receiver;
    private _value;
    private _hashLock;
    private _timeLock;
    private _txHash;
    private _withdrawn;
    private _refunded;
    private _preimage;
    private _status;
    constructor(contractId: UniqueEntityID, _sender: Address, _receiver: Address, _value: string, _hashLock: HashLock, _timeLock: TimeLock, _txHash: string);
    get sender(): Address;
    get receiver(): Address;
    get value(): string;
    get hashLock(): HashLock;
    get timeLock(): TimeLock;
    get txHash(): string;
}
