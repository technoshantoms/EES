export interface ValueObjectProps {
    [index: string]: any;
}
export default abstract class ValueObject<T extends ValueObjectProps> {
    readonly props: T;
    constructor(props: T);
    get value(): any;
    equals(vo?: ValueObject<T>): boolean;
}
