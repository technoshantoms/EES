"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = __importDefault(require("../config"));
const common_1 = require("@nestjs/common");
const QueueInterface_1 = require("./QueueInterface");
const EXCHANGE_NAME = "deposit";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_OPTION = {
    durable: true,
};
let RabbitMQ = class RabbitMQ {
    constructor() {
        this.channel = null;
        this.connection = null;
    }
    async initProduce() {
        await this.connect();
        await this.assertQueue(QueueInterface_1.EXTERNAL_DEPOSIT_CONTRACT_REDEEM);
        await this.assertQueue(QueueInterface_1.WITHDRAW_READY_TO_PROCESS);
        await this.assertQueue(QueueInterface_1.EXTERNAL_WITHDRAW_CONTRACT_REDEEM);
    }
    async consume(queueName, onMessage) {
        await this.connect();
        const channel = this.channel;
        const queue = await this.assertQueue(queueName);
        if (!queue) {
            return;
        }
        channel.consume(queue.queue, (msg) => {
            if (null === msg) {
                return;
            }
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
            onMessage(JSON.parse(msg.content.toString()), () => {
                channel.ack(msg);
            }, () => {
                channel.nack(msg);
            });
        }, {
            noAck: false,
        });
    }
    async publish(key, msg) {
        await this.connect();
        const channel = this.channel;
        channel.publish(EXCHANGE_NAME, key, Buffer.from(JSON.stringify(msg)), {
            persistent: true,
        });
    }
    async connect() {
        if (this.connection && this.channel) {
            return;
        }
        this.connection = await amqplib_1.default.connect({
            hostname: config_1.default.rabbitmq.host,
            port: config_1.default.rabbitmq.port,
        });
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);
    }
    async disconnect() {
        var _a;
        (_a = this.connection) === null || _a === void 0 ? void 0 : _a.close();
    }
    async assertQueue(queueName) {
        if (!this.channel) {
            return undefined;
        }
        const queue = await this.channel.assertQueue(queueName);
        await this.channel.bindQueue(queue.queue, EXCHANGE_NAME, queueName);
        return queue;
    }
};
RabbitMQ = __decorate([
    (0, common_1.Injectable)()
], RabbitMQ);
exports.default = RabbitMQ;
//# sourceMappingURL=RabbitMQ.js.map