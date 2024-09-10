import RepositoryInterface from "../../../Domain/RepositoryInterface";
import LoadAll from "./LoadAll";
import { Fees } from "../../../types";
import OperationsType = Fees.OperationsType;
export default class LoadAllHandler {
    readonly repository: RepositoryInterface;
    constructor(repository: RepositoryInterface);
    execute(query: LoadAll): Promise<[OperationsType, number, number]>;
}
