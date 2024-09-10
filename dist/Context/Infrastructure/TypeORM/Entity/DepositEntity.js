"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Deposit_1 = __importDefault(require("../../../Domain/Deposit"));
const UniqueEntityIDType_1 = __importDefault(require("../Type/UniqueEntityIDType"));
const DepositEntity = new typeorm_1.EntitySchema({
    name: "Deposit",
    target: Deposit_1.default,
    relations: {
        _depositRequest: {
            target: "DepositRequest",
            type: "one-to-one",
            joinColumn: {
                name: "deposit_request_id",
                referencedColumnName: "idString",
            },
        },
        _externalContract: {
            target: "ExternalContract",
            type: "one-to-one",
            joinColumn: {
                name: "external_contract_id",
                referencedColumnName: "idString",
            },
            cascade: ["insert"],
        },
        _internalContract: {
            target: "InternalContract",
            type: "one-to-one",
            joinColumn: {
                name: "internal_contract_id",
                referencedColumnName: "idString",
            },
            cascade: ["insert"],
        },
    },
    columns: {
        id: UniqueEntityIDType_1.default,
        _secret: {
            type: String,
            name: "secret",
            nullable: true,
        },
        _externalBlockchainRedeemTxHash: {
            type: String,
            name: "external_blockchain_redeem_tx_hash",
            nullable: true,
        },
        _internalBlockchainBurnTxHash: {
            type: String,
            name: "internal_blockchain_burn_tx_hash",
            nullable: true,
        },
        _status: {
            type: Number,
            name: "status",
        },
        _createdAt: {
            name: "created_at",
            createDate: true,
        },
        _mintedAmount: {
            type: String,
            name: "minted_amount",
            nullable: true,
        },
        _burnedAmount: {
            type: String,
            name: "burned_amount",
            nullable: true,
        },
    },
});
exports.default = DepositEntity;
//# sourceMappingURL=DepositEntity.js.map