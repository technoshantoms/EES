import { UseCase } from "context/Core/Domain/UseCase";
import ExternalBlockchain from "context/ExternalBlockchain/ExternalBlockchain";
import ExternalWithdrawRedeem from "context/Application/Command/ExternalBlockchain/MonitorExternalWithdrawRedeem/ExternalWithdrawRedeem";
import QueueInterface from "context/Queue/QueueInterface";
export default class ExternalWithdrawRedeemHandler implements UseCase<ExternalWithdrawRedeem, void> {
    private externalBlockchain;
    private rabbitMQ;
    constructor(externalBlockchain: ExternalBlockchain, rabbitMQ: QueueInterface);
    execute(command: ExternalWithdrawRedeem): Promise<void>;
}
