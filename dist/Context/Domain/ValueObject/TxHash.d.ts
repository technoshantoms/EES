import ValueObject from "../../Core/Domain/ValueObject";
import { Result } from "../../Core";
interface Props {
    value: string;
}
export default class TxHash extends ValueObject<Props> {
    private constructor();
    static create(txHash: string): Result<TxHash>;
}
export {};
