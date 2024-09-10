import UpdateOperation from "./UpdateOperation";
import Operation from "../../../Domain/Operation";
import { AppError } from "../../../../Core/Logic/AppError";
import { Result } from "../../../../Core/Logic/Result";
export default class UpdateOperationHandler {
    execute(request: UpdateOperation): Result<AppError, Operation>;
}
