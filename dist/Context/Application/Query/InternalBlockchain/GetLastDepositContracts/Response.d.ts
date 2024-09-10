import InternalHtlcContract from "context/InternalBlockchain/HtlcContract";
export default class Response {
    private readonly _contracts;
    constructor(_contracts: InternalHtlcContract[]);
    get contracts(): InternalHtlcContract[];
}
