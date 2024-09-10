export default class Identifier<T> {
    private value;
    constructor(value: T);
    equals(id?: Identifier<T>): boolean;
    toString(): string;
    toValue(): T;
}
