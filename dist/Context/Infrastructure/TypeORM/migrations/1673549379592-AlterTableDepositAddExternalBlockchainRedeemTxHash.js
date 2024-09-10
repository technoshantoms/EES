"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592 = void 0;
class AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592 {
    constructor() {
        this.name = 'AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`external_blockchain_redeem_tx_hash\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`external_blockchain_redeem_tx_hash\``);
    }
}
exports.AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592 = AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592;
//# sourceMappingURL=1673549379592-AlterTableDepositAddExternalBlockchainRedeemTxHash.js.map