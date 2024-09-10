"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsquared_js_ws_1 = require("@r-squared/rsquared-js-ws");
class BlockchainRepository {
    async load() {
        const data = (await rsquared_js_ws_1.Apis.instance()
            .db_api()
            .exec("get_global_properties", [])).parameters;
        return data;
    }
}
exports.default = new BlockchainRepository();
//# sourceMappingURL=BlockchainRepository.js.map