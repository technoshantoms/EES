"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StubRepository {
    constructor() {
        this.items = {};
    }
    add(key, value) {
        this.items[key] = value;
    }
    clear() {
        this.items = {};
    }
    async load() {
        return this.items;
    }
}
exports.default = new StubRepository();
//# sourceMappingURL=StubRepository.js.map