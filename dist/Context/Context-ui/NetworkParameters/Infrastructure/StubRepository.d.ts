import RepositoryInterface from "../Domain/RepositoryInterface";
import { NetworkParameters } from "../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;
declare class StubRepository implements RepositoryInterface {
    private items;
    add(key: string, value: BlockchainParameterType): void;
    clear(): void;
    load(): Promise<BlockchainParametersType>;
}
declare const _default: StubRepository;
export default _default;
