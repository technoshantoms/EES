import HandlerInterface from "context/Core/Domain/Events/HandlerInterface";
import WithdrawReadyToProcessEvent from "context/Domain/Event/WithdrawReadyToProcessEvent";
export default class AfterWithdrawReadyToProcess implements HandlerInterface<WithdrawReadyToProcessEvent> {
    private readonly sender;
    constructor();
    setupSubscriptions(): void;
    private onWithdrawReadyToProcessEvent;
}
