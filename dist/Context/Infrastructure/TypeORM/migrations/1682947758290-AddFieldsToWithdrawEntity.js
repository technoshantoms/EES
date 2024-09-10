"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldsToWithdrawEntity1682947758290 = void 0;
class AddFieldsToWithdrawEntity1682947758290 {
    constructor() {
        this.name = "AddFieldsToWithdrawEntity1682947758290";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`error_message\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`hashlock\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`timelock\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`amount_of_htlc\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`amount_of_withdrawal_fee\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`asset_of_withdrawal_fee\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`asset_of_withdrawal_fee\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`amount_of_withdrawal_fee\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`amount_of_htlc\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`timelock\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`hashlock\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`error_message\``);
    }
}
exports.AddFieldsToWithdrawEntity1682947758290 = AddFieldsToWithdrawEntity1682947758290;
//# sourceMappingURL=1682947758290-AddFieldsToWithdrawEntity.js.map