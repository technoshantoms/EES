import { NetworkParameters } from "./types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
export declare function loadAllParameters(): Promise<NetworkParametersType>;
export declare function loadAllRawParameters(): Promise<BlockchainParametersType>;
