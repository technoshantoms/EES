import WithdrawRequest from "context/Domain/WithdrawRequest";
import WithdrawRequestRepositoryInterface from "context/Domain/WithdrawRequestRepositoryInterface";
export default class WithdrawRequestRepository implements WithdrawRequestRepositoryInterface {
    private _withdrawRequests;
    save(withdrawRequest: WithdrawRequest): void;
    create(withdrawRequest: WithdrawRequest): void;
    get size(): number;
    reset(): void;
    findAllCreated(): Promise<WithdrawRequest[]>;
}
