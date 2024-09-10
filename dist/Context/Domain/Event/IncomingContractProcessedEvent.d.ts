import DomainEventInterface from "../../Core/Domain/Events/DomainEventInterface";
export default class IncomingContractProcessedEvent implements DomainEventInterface {
    depositId: string;
    dateTimeOccurred: Date;
    constructor(depositId: string);
    static eventName(): string;
}
