"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor() {
        this.settings = {};
    }
    async load(name) {
        if (name in this.settings) {
            return this.settings[name];
        }
        return null;
    }
    async save(name, value) {
        this.settings[name] = value;
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map