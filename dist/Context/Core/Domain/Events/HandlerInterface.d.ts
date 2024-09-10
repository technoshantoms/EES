export default interface HandlerInterface<DomainEventInterface> {
    setupSubscriptions(): void;
}
