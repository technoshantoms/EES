import RepositoryInterface from "../Domain/RepositoryInterface";
import { Fees } from "../types";
import JsonOperationsType = Fees.JsonOperationsType;
import Operations = Fees.OperationsType;
export default class BlockchainRepository implements RepositoryInterface {
    private jsonOperations;
    constructor(jsonOperations: JsonOperationsType);
    loadAll(): Promise<[Operations, number, number]>;
}
