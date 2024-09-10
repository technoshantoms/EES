"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StubQueue {
    constructor() {
        this.key = "";
        this.message = null;
    }
    consume(queueName, onMessage) {
        return Promise.resolve(undefined);
    }
    initProduce() {
        return Promise.resolve(undefined);
    }
    publish(key, message) {
        this.key = key;
        this.message = message;
        return Promise.resolve(undefined);
    }
}
exports.default = StubQueue;
//# sourceMappingURL=StubQueue.js.map