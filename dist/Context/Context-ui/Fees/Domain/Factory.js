"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operation_1 = __importDefault(require("./Operation"));
const Fee_1 = __importDefault(require("./Fee"));
class Factory {
    create(blockchainOperation, jsonOperation) {
        const operation = new Operation_1.default(jsonOperation.id, jsonOperation.name);
        const blockchainFees = blockchainOperation[1];
        for (const blockchainFee in blockchainFees) {
            const fee = Fee_1.default.create(blockchainFee, blockchainFees[blockchainFee]);
            operation.addFee(fee);
        }
        if (jsonOperation.clearing_house_participant_transfer_fee) {
            operation.setShowCHParticipantTransferFee();
        }
        if (jsonOperation.ltm_required) {
            operation.setLtmRequired();
        }
        return operation;
    }
}
exports.default = new Factory();
//# sourceMappingURL=Factory.js.map