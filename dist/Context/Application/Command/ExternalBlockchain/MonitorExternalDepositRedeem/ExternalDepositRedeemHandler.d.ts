import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ExternalDepositRedeem from "context/Application/Command/ExternalBlockchain/MonitorExternalDepositRedeem/ExternalDepositRedeem";
import QueueInterface from "context/Queue/QueueInterface";
export default class ExternalDepositRedeemHandler implements UseCase<ExternalDepositRedeem, void> {
    private externalBlockchain;
    private rabbitMQ;
    constructor(externalBlockchain: ExternalBlockchain, rabbitMQ: QueueInterface);
    execute(command: ExternalDepositRedeem): Promise<void>;
}
