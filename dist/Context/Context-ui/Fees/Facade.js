"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScaleAndNetworkPercentOfFee = exports.loadAllOperations = void 0;
const _1 = require("./");
async function loadAllOperations() {
    const query = new _1.LoadAll();
    const [operations] = await _1.loadAllHandler.execute(query);
    return operations;
}
exports.loadAllOperations = loadAllOperations;
async function getScaleAndNetworkPercentOfFee() {
    const query = new _1.LoadAll();
    const [_, scale, networkPercentOfFee] = await _1.loadAllHandler.execute(query);
    return [scale, networkPercentOfFee];
}
exports.getScaleAndNetworkPercentOfFee = getScaleAndNetworkPercentOfFee;
//# sourceMappingURL=Facade.js.map