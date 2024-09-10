import ValueObject from "context/Core/Domain/ValueObject";
interface AddressProps {
    value: string;
}
export default class Address extends ValueObject<AddressProps> {
    private constructor();
    static create(address: string): Address;
}
export {};
