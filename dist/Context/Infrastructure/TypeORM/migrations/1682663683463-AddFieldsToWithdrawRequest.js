"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldsToWithdrawRequest1682663683463 = void 0;
class AddFieldsToWithdrawRequest1682663683463 {
    constructor() {
        this.name = "AddFieldsToWithdrawRequest1682663683463";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` ADD \`amount_to_pay_in_RQETH\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` ADD \`address_of_user_in_ethereum\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` DROP COLUMN \`address_of_user_in_ethereum\``);
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` DROP COLUMN \`amount_to_pay_in_RQETH\``);
    }
}
exports.AddFieldsToWithdrawRequest1682663683463 = AddFieldsToWithdrawRequest1682663683463;
//# sourceMappingURL=1682663683463-AddFieldsToWithdrawRequest.js.map