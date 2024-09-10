import NetworkParameter from "./NetworkParameter";
import FactoryInterface from "./FactoryInterface";
import { NetworkParameters } from "../types";
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;
import JsonParameterType = NetworkParameters.JsonParameterType;
declare class Factory implements FactoryInterface {
    create(name: string, value: BlockchainParameterType, jsonParameter?: JsonParameterType | null): NetworkParameter;
    private updateFromJsonParameter;
}
export default Factory;
