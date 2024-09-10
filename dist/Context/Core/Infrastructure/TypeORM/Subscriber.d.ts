import { EntitySubscriberInterface, InsertEvent } from "typeorm";
import AggregateRoot from "../../Domain/AggregateRoot";
export default class Subscriber implements EntitySubscriberInterface {
    afterInsert(event: InsertEvent<AggregateRoot>): void;
}
