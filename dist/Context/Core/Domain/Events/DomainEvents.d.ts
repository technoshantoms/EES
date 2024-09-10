import DomainEventInterface from "./DomainEventInterface";
import AggregateRoot from "../AggregateRoot";
import UniqueEntityID from "../UniqueEntityID";
export default class DomainEvents {
    private static handlersMap;
    private static markedAggregates;
    static markAggregateForDispatch(aggregate: AggregateRoot): void;
    private static dispatchAggregateEvents;
    private static removeAggregateFromMarkedDispatchList;
    private static findMarkedAggregateByID;
    static dispatchEventsForAggregate(id: UniqueEntityID): void;
    static register(callback: (event: DomainEventInterface) => void, eventClassName: string): void;
    static clearHandlers(): void;
    static clearMarkedAggregates(): void;
    private static dispatch;
}
