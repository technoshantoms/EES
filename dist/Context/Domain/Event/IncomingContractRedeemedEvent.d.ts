import DomainEventInterface from "../../Core/Domain/Events/DomainEventInterface";
export default class IncomingContractRedeemedEvent implements DomainEventInterface {
    depositId: string;
    dateTimeOccurred: Date;
    constructor(depositId: string);
    static eventName(): string;
}
