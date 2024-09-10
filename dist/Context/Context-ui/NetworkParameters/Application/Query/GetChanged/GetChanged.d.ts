import { Map } from "immutable";
import NetworkParameter from "../../../Domain/NetworkParameter";
export default class GetChanged {
    private _parameters;
    constructor(_parameters: Map<string, NetworkParameter>);
    get parameters(): Map<string, NetworkParameter>;
}
