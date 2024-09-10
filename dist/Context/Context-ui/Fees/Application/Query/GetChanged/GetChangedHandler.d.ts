import GetChanged from "./GetChanged";
import { Fees } from "../../../types";
import OperationsType = Fees.OperationsType;
import { Result } from "../../../../Core/Logic/Result";
import { AppError } from "../../../../Core/Logic/AppError";
export default class GetChangedHandler {
    execute(request: GetChanged): Result<AppError, OperationsType>;
    private findChanged;
}
