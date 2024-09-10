import ValueObject from "../../Core/Domain/ValueObject";
interface NativeAccountProps {
    value: string;
}
export default class NativeAccount extends ValueObject<NativeAccountProps> {
    private constructor();
    static create(nativeAccount: string): NativeAccount;
}
export {};
