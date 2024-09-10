"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldToWithdraw1684757245813 = void 0;
class AddFieldToWithdraw1684757245813 {
    constructor() {
        this.name = "AddFieldToWithdraw1684757245813";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`external_blockchain_redeem_tx_hash\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`external_blockchain_redeem_tx_hash\``);
    }
}
exports.AddFieldToWithdraw1684757245813 = AddFieldToWithdraw1684757245813;
//# sourceMappingURL=1684757245813-AddFieldToWithdraw.js.map