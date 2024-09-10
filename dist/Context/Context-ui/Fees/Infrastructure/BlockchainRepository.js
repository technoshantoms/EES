"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rsquared_js_ws_1 = require("@r-squared/rsquared-js-ws");
const Factory_1 = __importDefault(require("../Domain/Factory"));
class BlockchainRepository {
    constructor(jsonOperations) {
        this.jsonOperations = jsonOperations;
    }
    async loadAll() {
        const data = (await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_global_properties", [])).parameters;
        const blockchainOperations = data.current_fees.parameters;
        const scale = data.current_fees.scale;
        const networkPercentOfFee = data.network_percent_of_fee;
        const operations = {};
        for (const blockchainOperation of blockchainOperations) {
            const jsonOperation = this.jsonOperations.find(jsonOperation => jsonOperation.id == blockchainOperation[0]);
            if (jsonOperation) {
                const operation = Factory_1.default.create(blockchainOperation, jsonOperation);
                operations[operation.id] = operation;
            }
        }
        return [operations, scale, networkPercentOfFee];
    }
}
exports.default = BlockchainRepository;
//# sourceMappingURL=BlockchainRepository.js.map