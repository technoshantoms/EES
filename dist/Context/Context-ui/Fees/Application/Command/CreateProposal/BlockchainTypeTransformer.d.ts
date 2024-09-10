import { Fees } from "../../../types";
import OperationsType = Fees.OperationsType;
import BlockchainOperationsType = Fees.BlockchainOperationsType;
export default class BlockchainTypeTransformer {
    transform(operations: OperationsType): BlockchainOperationsType;
}
