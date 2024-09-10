import { UseCase } from "context/Core/Domain/UseCase";
import RedeemDepositExternalContract from "./RedeemDepositExternalContract";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
export default class RedeemDepositExternalContractHandler implements UseCase<RedeemDepositExternalContract, void> {
    private depositRepository;
    private externalBlockchain;
    constructor(depositRepository: DepositRepositoryInterface, externalBlockchain: ExternalBlockchain);
    execute(command: RedeemDepositExternalContract): Promise<void>;
}
