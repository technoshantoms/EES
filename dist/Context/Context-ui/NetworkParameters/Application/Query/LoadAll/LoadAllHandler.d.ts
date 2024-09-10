import NetworkParameter from "../../../Domain/NetworkParameter";
import LoadAll from "./LoadAll";
import { Map } from "immutable";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import { NetworkParameters } from "../../../types";
import JsonParametersType = NetworkParameters.JsonParametersType;
export default class LoadAllHandler {
    readonly repository: RepositoryInterface;
    readonly jsonParameters: JsonParametersType;
    constructor(repository: RepositoryInterface, jsonParameters: JsonParametersType);
    execute(request: LoadAll): Promise<Map<string, NetworkParameter>>;
}
