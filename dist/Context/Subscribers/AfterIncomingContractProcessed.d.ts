import HandlerInterface from "context/Core/Domain/Events/HandlerInterface";
import IncomingContractProcessedEvent from "context/Domain/Event/IncomingContractProcessedEvent";
export default class AfterIncomingContractProcessed implements HandlerInterface<IncomingContractProcessedEvent> {
    private readonly sender;
    constructor();
    setupSubscriptions(): void;
    private onDepositConfirmedEvent;
}
