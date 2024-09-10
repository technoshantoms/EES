import { DataSource } from "typeorm";
import DepositRequest from "../../Domain/DepositRequest";
import DepositRequestRepositoryInterface from "../../Domain/DepositRequestRepositoryInterface";
import HashLock from "context/Domain/ValueObject/HashLock";
export default class DepositRequestTypeOrmRepository implements DepositRequestRepositoryInterface {
    private _datasource;
    constructor(_datasource: DataSource);
    create(depositRequest: DepositRequest): Promise<void>;
    load(hashLock: HashLock): Promise<DepositRequest | null>;
}
