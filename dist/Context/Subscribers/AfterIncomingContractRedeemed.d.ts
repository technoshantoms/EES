import HandlerInterface from "context/Core/Domain/Events/HandlerInterface";
import IncomingContractRedeemedEvent from "context/Domain/Event/IncomingContractRedeemedEvent";
export default class AfterIncomingContractRedeemed implements HandlerInterface<IncomingContractRedeemedEvent> {
    private readonly sender;
    constructor();
    setupSubscriptions(): void;
    private onDepositRedeemedEvent;
}
