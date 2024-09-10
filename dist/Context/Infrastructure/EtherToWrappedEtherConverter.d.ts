import ConverterInterface from "context/Domain/ConverterInterface";
type Eth = number;
type RQETH = number;
export default class EtherToWrappedEtherConverter implements ConverterInterface {
    convert(eth: Eth): RQETH;
}
export {};
