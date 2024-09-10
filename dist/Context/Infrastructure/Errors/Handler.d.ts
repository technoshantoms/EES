export default class Handler {
    private prefix;
    constructor(prefix: string);
    handle(e: Error): void;
}
