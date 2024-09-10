import { ProposalTypes } from "../types";
import ParameterValueType = ProposalTypes.ParameterValueType;
export default class Parameter {
    private _name;
    private _value;
    private _networkValue;
    private _changed;
    private _new;
    constructor(_name: string, _value: ParameterValueType);
    get name(): string;
    get value(): ParameterValueType;
    get changed(): boolean;
    get new(): boolean;
    set networkValue(newValue: ParameterValueType | null);
    get networkValue(): ProposalTypes.ParameterValueType | null;
    markAsNew(): void;
    static create(name: string, value: ParameterValueType): Parameter;
}
