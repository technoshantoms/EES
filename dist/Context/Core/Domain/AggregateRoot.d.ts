import Entity from "./Entity";
import DomainEventInterface from "./Events/DomainEventInterface";
import UniqueEntityID from "./UniqueEntityID";
export default abstract class AggregateRoot extends Entity {
    private _domainEvents;
    get id(): UniqueEntityID;
    get domainEvents(): DomainEventInterface[];
    protected addDomainEvent(domainEvent: DomainEventInterface): void;
    clearEvents(): void;
    set id(id: UniqueEntityID);
}
