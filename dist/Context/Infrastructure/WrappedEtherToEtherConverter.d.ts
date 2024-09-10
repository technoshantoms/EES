import ConverterInterface from "context/Domain/ConverterInterface";
type Eth = number;
type RQETH = number;
export default class WrappedEtherToEtherConverter implements ConverterInterface {
    convert(RQETH: RQETH): Eth;
}
export {};
