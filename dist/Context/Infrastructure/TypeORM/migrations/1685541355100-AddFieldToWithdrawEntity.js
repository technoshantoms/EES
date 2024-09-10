"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldToWithdrawEntity1685541355100 = void 0;
class AddFieldToWithdrawEntity1685541355100 {
    constructor() {
        this.name = "AddFieldToWithdrawEntity1685541355100";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`external_blockchain_refund_tx_hash\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`external_blockchain_refund_tx_hash\``);
    }
}
exports.AddFieldToWithdrawEntity1685541355100 = AddFieldToWithdrawEntity1685541355100;
//# sourceMappingURL=1685541355100-AddFieldToWithdrawEntity.js.map