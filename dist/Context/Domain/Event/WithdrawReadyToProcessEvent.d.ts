import DomainEventInterface from "../../Core/Domain/Events/DomainEventInterface";
export default class WithdrawReadyToProcessEvent implements DomainEventInterface {
    withdrawId: string;
    dateTimeOccurred: Date;
    constructor(withdrawId: string);
    static eventName(): string;
}
