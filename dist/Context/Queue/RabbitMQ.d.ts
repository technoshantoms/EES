import QueueInterface from "context/Queue/QueueInterface";
export default class RabbitMQ implements QueueInterface {
    private channel;
    private connection;
    initProduce(): Promise<void>;
    consume<T>(queueName: string, onMessage: (msg: T, ack: () => void, nack: () => void) => void): Promise<void>;
    publish(key: string, msg: any): Promise<void>;
    private connect;
    disconnect(): Promise<void>;
    private assertQueue;
}
