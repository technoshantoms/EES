"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const WithdrawRequest_1 = __importDefault(require("../../../Domain/WithdrawRequest"));
const NativeAccountType_1 = __importDefault(require("../Type/NativeAccountType"));
const WithdrawRequestEntity = new typeorm_1.EntitySchema({
    name: "WithdrawRequest",
    tableName: "withdraw_request",
    target: WithdrawRequest_1.default,
    columns: {
        idString: {
            name: "id",
            type: String,
            primary: true,
        },
        _status: {
            name: "status",
            type: Number,
        },
        _nativeAccount: NativeAccountType_1.default,
        _createdAt: {
            name: "created_at",
            createDate: true,
        },
        _amountToPayInRQETH: {
            name: "amount_to_pay_in_RQETH",
            type: "decimal",
            precision: 15,
            scale: 5,
        },
        _addressOfUserInEthereum: {
            name: "address_of_user_in_ethereum",
            type: String,
        },
        _withdrawalFeeAmount: {
            name: "withdrawal_fee_amount",
            type: "decimal",
            precision: 15,
            scale: 5,
        },
        _withdrawalFeeCurrency: {
            name: "withdrawal_fee_currency",
            type: String,
        },
    },
});
exports.default = WithdrawRequestEntity;
//# sourceMappingURL=WithdrawRequestEntity.js.map