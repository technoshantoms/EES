"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidWithdrawalFee = exports.InvalidPreimage = exports.InvalidHashlock = exports.InvalidTimelock = exports.InvalidAsset = exports.InvalidAmount = exports.InvalidReceiver = exports.HTLCCreateOperationNotFound = exports.BlockIsReversible = exports.HardFailError = void 0;
const UseCaseError_1 = require("../../../../Core/Logic/UseCaseError");
class HardFailError extends UseCaseError_1.UseCaseError {
}
exports.HardFailError = HardFailError;
class BlockIsReversible extends UseCaseError_1.UseCaseError {
    constructor(operationId) {
        super(`Block of HTLC create operation ${operationId} is reversible.`);
    }
}
exports.BlockIsReversible = BlockIsReversible;
class HTLCCreateOperationNotFound extends HardFailError {
    constructor(withdraw) {
        super(`The HTLC create operation ${withdraw.htlcCreateOperationId} of withdraw ${withdraw.idString} was not found.`);
    }
}
exports.HTLCCreateOperationNotFound = HTLCCreateOperationNotFound;
class InvalidReceiver extends HardFailError {
    constructor(operationId) {
        super(`Invalid receiver of ${operationId}.`);
    }
}
exports.InvalidReceiver = InvalidReceiver;
class InvalidAmount extends HardFailError {
    constructor(withdraw) {
        super(`Amount in ${withdraw.htlcCreateOperationId} smaller than minimum withdrawal amount.`);
    }
}
exports.InvalidAmount = InvalidAmount;
class InvalidAsset extends HardFailError {
    constructor(withdraw) {
        super(`Asset of ${withdraw.htlcCreateOperationId} is invalid (is not RQETH).`);
    }
}
exports.InvalidAsset = InvalidAsset;
class InvalidTimelock extends HardFailError {
    constructor(withdraw) {
        super(`Timelock of ${withdraw.htlcCreateOperationId} is invalid, must be greater than withdraw timelock.`);
    }
}
exports.InvalidTimelock = InvalidTimelock;
class InvalidHashlock extends HardFailError {
    constructor(withdraw) {
        super(`Hashlock of ${withdraw.htlcCreateOperationId} is empty.`);
    }
}
exports.InvalidHashlock = InvalidHashlock;
class InvalidPreimage extends HardFailError {
    constructor(withdraw) {
        super(`Preimage of ${withdraw.htlcCreateOperationId} must be absent.`);
    }
}
exports.InvalidPreimage = InvalidPreimage;
class InvalidWithdrawalFee extends HardFailError {
    constructor(withdraw) {
        super(`Amount in ${withdraw.transferOperationId} smaller than minimum withdrawal fee.`);
    }
}
exports.InvalidWithdrawalFee = InvalidWithdrawalFee;
//# sourceMappingURL=Errors.js.map