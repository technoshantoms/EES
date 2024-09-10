import GetChanged from "./GetChanged";
import { NetworkParameters } from "../../../types";
export default class GetChangedHandler {
    execute(request: GetChanged): NetworkParameters.ParametersType;
    private findChanged;
}
