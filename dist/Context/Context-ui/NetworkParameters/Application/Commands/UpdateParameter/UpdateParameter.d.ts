import NetworkParameter, { ParameterValueType } from "../../../Domain/NetworkParameter";
import { Map } from "immutable";
export default class UpdateParameter {
    private _parameters;
    private _key;
    private _newValue;
    constructor(_parameters: Map<string, NetworkParameter>, _key: string, _newValue: ParameterValueType);
    get parameters(): Map<string, NetworkParameter>;
    get key(): string;
    get newValue(): ParameterValueType;
}
