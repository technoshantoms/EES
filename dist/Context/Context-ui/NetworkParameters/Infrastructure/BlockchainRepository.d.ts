import RepositoryInterface from "../Domain/RepositoryInterface";
import { NetworkParameters } from "../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
declare class BlockchainRepository implements RepositoryInterface {
    load(): Promise<BlockchainParametersType>;
}
declare const _default: BlockchainRepository;
export default _default;
