import ProviderInterface from "./ProviderInterface";
import CreateHtlcResponse from "./CreateHtlcResponse";
import HTLC from "../../Domain/HTLC";
export default class Web3Provider implements ProviderInterface {
    create(htlc: HTLC): Promise<CreateHtlcResponse>;
}
