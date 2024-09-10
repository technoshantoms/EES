import { DataSource } from "typeorm";
import WithdrawRequest from "../../Domain/WithdrawRequest";
import WithdrawRequestRepositoryInterface from "../../Domain/WithdrawRequestRepositoryInterface";
export default class WithdrawRequestTypeOrmRepository implements WithdrawRequestRepositoryInterface {
    private _datasource;
    constructor(_datasource: DataSource);
    create(withdrawRequest: WithdrawRequest): Promise<void>;
    findAllCreated(): Promise<WithdrawRequest[]>;
    save(request: WithdrawRequest): Promise<void>;
}
