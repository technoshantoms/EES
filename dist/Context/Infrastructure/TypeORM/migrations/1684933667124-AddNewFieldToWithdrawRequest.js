"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewFieldToWithdrawRequest1684933667124 = void 0;
class AddNewFieldToWithdrawRequest1684933667124 {
    constructor() {
        this.name = "AddNewFieldToWithdrawRequest1684933667124";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` ADD \`withdrawal_fee_amount\` decimal(15,5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` ADD \`withdrawal_fee_currency\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` DROP COLUMN \`withdrawal_fee_currency\``);
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` DROP COLUMN \`withdrawal_fee_amount\``);
    }
}
exports.AddNewFieldToWithdrawRequest1684933667124 = AddNewFieldToWithdrawRequest1684933667124;
//# sourceMappingURL=1684933667124-AddNewFieldToWithdrawRequest.js.map