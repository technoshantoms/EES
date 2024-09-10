import Setting from "context/Setting/Setting";
import { UseCase } from "context/Core/Domain/UseCase";
import GetLastDepositContracts from "./GetLastDepositContracts";
import InternalBlockchain from "context/InternalBlockchain/InternalBlockchain";
import Response from "./Response";
export default class GetLastDepositContractsHandler implements UseCase<GetLastDepositContracts, Response> {
    private readonly internalBlockchain;
    private setting;
    constructor(internalBlockchain: InternalBlockchain, setting: Setting);
    execute(query: GetLastDepositContracts): Promise<Response>;
    private getLastProcessedContract;
    private getNextContractToProcess;
    private parseContractIdLastNumber;
}
