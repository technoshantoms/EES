import UpdateParameter from "./UpdateParameter";
import { Map } from "immutable";
import NetworkParameter, { ParameterValueType } from "../../../Domain/NetworkParameter";
export default class UpdateParameterHandler {
    execute(command: UpdateParameter): Map<string, NetworkParameter>;
    updateGroupParameter(parameter: NetworkParameter, path: string[], newValue: ParameterValueType): void;
}
