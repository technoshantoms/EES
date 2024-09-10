import { Fees } from "../../../types";
import OperationsType = Fees.OperationsType;
export default class GetChanged {
    private _operations;
    constructor(_operations: OperationsType);
    get parameters(): OperationsType;
}
