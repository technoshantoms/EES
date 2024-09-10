import ValueObject from "../../Core/Domain/ValueObject";
interface TxHashProps {
    value: string;
}
export default class HashLock extends ValueObject<TxHashProps> {
    private constructor();
    static create(hashLock: string): HashLock;
}
export {};
