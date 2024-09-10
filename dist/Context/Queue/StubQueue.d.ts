import QueueInterface from "context/Queue/QueueInterface";
export default class StubQueue implements QueueInterface {
    key: string;
    message: any;
    consume<T>(queueName: string, onMessage: (msg: T, ack: () => void, nack: () => void) => void): Promise<void>;
    initProduce(): Promise<void>;
    publish(key: string, message: any): Promise<void>;
}
