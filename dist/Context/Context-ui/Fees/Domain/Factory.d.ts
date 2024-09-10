import Operation from "./Operation";
import FactoryInterface from "./FactoryInterface";
import { Fees } from "../types";
import BlockchainOperationType = Fees.BlockchainOperationType;
import JsonOperationType = Fees.JsonOperationType;
declare class Factory implements FactoryInterface {
    create(blockchainOperation: BlockchainOperationType, jsonOperation: JsonOperationType): Operation;
}
declare const _default: Factory;
export default _default;
