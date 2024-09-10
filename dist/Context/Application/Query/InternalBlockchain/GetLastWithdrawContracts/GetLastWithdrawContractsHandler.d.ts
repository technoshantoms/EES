import Setting from "context/Setting/Setting";
import { UseCase } from "context/Core/Domain/UseCase";
import GetLastWithdrawContracts from "./GetLastWithdrawContracts";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import Response from "./Response";
export default class GetLastWithdrawContractsHandler implements UseCase<GetLastWithdrawContracts, Response> {
    private readonly internalBlockchain;
    private setting;
    constructor(internalBlockchain: InternalBlockchain, setting: Setting);
    execute(query: GetLastWithdrawContracts): Promise<Response>;
}
