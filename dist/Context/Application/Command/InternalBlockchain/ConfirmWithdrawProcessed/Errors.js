"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockIsReversible = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class BlockIsReversible extends UseCaseError_1.UseCaseError {
    constructor(txHash) {
        super(`Block of HTLC redeem operation ${txHash} is reversible.`);
    }
}
exports.BlockIsReversible = BlockIsReversible;
//# sourceMappingURL=Errors.js.map