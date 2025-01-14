import amqp, { Channel, Connection } from "amqplib";
import config from "context/config";
import { ConsumeMessage, Replies } from "amqplib/properties";
import { Injectable } from "@nestjs/common";
import QueueInterface, {
    EXTERNAL_DEPOSIT_CONTRACT_REDEEM,
    EXTERNAL_WITHDRAW_CONTRACT_REDEEM,
    WITHDRAW_READY_TO_PROCESS,
} from "context/Queue/QueueInterface";

const EXCHANGE_NAME = "deposit";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_OPTION = {
    durable: true,
};

@Injectable()
export default class RabbitMQ implements QueueInterface {
    private channel: Channel | null = null;
    private connection: Connection | null = null;

    public async initProduce() {
        await this.connect();
        await this.assertQueue(EXTERNAL_DEPOSIT_CONTRACT_REDEEM);
        await this.assertQueue(WITHDRAW_READY_TO_PROCESS);
        await this.assertQueue(EXTERNAL_WITHDRAW_CONTRACT_REDEEM);
    }

    public async consume<T>(queueName: string, onMessage: (msg: T, ack: () => void, nack: () => void) => void) {
        await this.connect();
        const channel = this.channel as Channel;

        const queue = await this.assertQueue(queueName);

        if (!queue) {
            return;
        }

        channel.consume(
            queue.queue,
            (msg: ConsumeMessage | null) => {
                if (null === msg) {
                    return;
                }

                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
                onMessage(
                    JSON.parse(msg.content.toString()),
                    () => {
                        channel.ack(msg);
                    },
                    () => {
                        channel.nack(msg);
                    }
                );
            },
            {
                noAck: false,
            }
        );
    }

    public async publish(key: string, msg: any) {
        await this.connect();
        const channel = this.channel as Channel;
        channel.publish(EXCHANGE_NAME, key, Buffer.from(JSON.stringify(msg)), {
            persistent: true,
        });
    }

    private async connect() {
        if (this.connection && this.channel) {
            return;
        }
        this.connection = await amqp.connect({
            hostname: config.rabbitmq.host,
            port: config.rabbitmq.port,
            username: config.rabbitmq.user,
            password: config.rabbitmq.password,
        });
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);
    }

    public async disconnect() {
        this.connection?.close();
    }

    private async assertQueue(queueName: string): Promise<Replies.AssertQueue | undefined> {
        if (!this.channel) {
            return undefined;
        }

        const queue = await this.channel.assertQueue(queueName);
        await this.channel.bindQueue(queue.queue, EXCHANGE_NAME, queueName);

        return queue;
    }
}
