"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProposal = void 0;
const _1 = require("./");
async function createProposal(transaction, expirationTime, reviewPeriod) {
    const command = new _1.Create(transaction, expirationTime, reviewPeriod);
    return await _1.createHandler.execute(command);
}
exports.createProposal = createProposal;
//# sourceMappingURL=Facade.js.map