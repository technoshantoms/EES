import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ExternalDepositRefund from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRefund/ExternalDepositRefund";
import DepositRepositoryInterface from "context/Domain/DepositRepositoryInterface";
export default class ExternalDepositRefundHandler implements UseCase<ExternalDepositRefund, void> {
    private externalBlockchain;
    private depositRepository;
    constructor(externalBlockchain: ExternalBlockchain, depositRepository: DepositRepositoryInterface);
    execute(command: ExternalDepositRefund): Promise<void>;
}
