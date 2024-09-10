"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trxHelper_1 = require("../../../../../lib/common/trxHelper");
class CalcWithdrawTransactionFeeHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            (0, trxHelper_1.checkFeeStatusAsync)({
                type: "transfer",
                accountID: command.account.get("id"),
                feeID: command.assetId,
                data: undefined
            })
                .then(({ fee }) => {
                const transferFee = fee;
                (0, trxHelper_1.checkFeeStatusAsync)({
                    type: "htlc_create",
                    accountID: command.account.get("id"),
                    feeID: command.assetId,
                    data: {
                        type: "memo",
                        content: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    }
                })
                    .then(({ fee }) => {
                    resolve(transferFee.amount /
                        Math.pow(10, transferFee.precision) +
                        fee.amount / Math.pow(10, fee.precision));
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
}
exports.default = CalcWithdrawTransactionFeeHandler;
//# sourceMappingURL=CalcWithdrawTransactionFeeHandler.js.map