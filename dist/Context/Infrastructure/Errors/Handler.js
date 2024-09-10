"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor(prefix) {
        this.prefix = prefix;
    }
    handle(e) {
        console.log(`[${this.prefix}]: ${e.message}`);
    }
}
exports.default = Handler;
//# sourceMappingURL=Handler.js.map