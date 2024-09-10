"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldsToWithdrawRequest1682664326082 = void 0;
class UpdateFieldsToWithdrawRequest1682664326082 {
    constructor() {
        this.name = "UpdateFieldsToWithdrawRequest1682664326082";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` CHANGE \`amount_to_pay_in_RQETH\` \`amount_to_pay_in_RQETH\` decimal(15,5) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` CHANGE \`amount_to_pay_in_RQETH\` \`amount_to_pay_in_RQETH\` decimal(10,0) NOT NULL`);
    }
}
exports.UpdateFieldsToWithdrawRequest1682664326082 = UpdateFieldsToWithdrawRequest1682664326082;
//# sourceMappingURL=1682664326082-UpdateFieldsToWithdrawRequest.js.map