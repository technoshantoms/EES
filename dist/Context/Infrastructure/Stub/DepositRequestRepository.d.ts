import DepositRequest from "context/Domain/DepositRequest";
import DepositRequestRepositoryInterface from "context/Domain/DepositRequestRepositoryInterface";
import HashLock from "context/Domain/ValueObject/HashLock";
export default class DepositRequestRepository implements DepositRequestRepositoryInterface {
    private _depositRequests;
    create(depositRequest: DepositRequest): void;
    load(hashLock: HashLock): Promise<DepositRequest | null>;
    get size(): number;
    reset(): void;
}
