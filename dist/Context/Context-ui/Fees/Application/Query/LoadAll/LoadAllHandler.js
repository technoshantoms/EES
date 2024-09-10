"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoadAllHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(query) {
        const [operations, scale, networkPercentOfFee] = await this.repository.loadAll();
        return [operations, scale, networkPercentOfFee];
    }
}
exports.default = LoadAllHandler;
//# sourceMappingURL=LoadAllHandler.js.map