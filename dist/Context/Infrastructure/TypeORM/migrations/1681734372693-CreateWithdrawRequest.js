"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWithdrawRequest1681734372693 = void 0;
class CreateWithdrawRequest1681734372693 {
    constructor() {
        this.name = "CreateWithdrawRequest1681734372693";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`withdraw_request\` (\`id\` varchar(255) NOT NULL, \`native_account\` varchar(255) NOT NULL, \`hash_lock\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`withdraw_request\``);
    }
}
exports.CreateWithdrawRequest1681734372693 = CreateWithdrawRequest1681734372693;
//# sourceMappingURL=1681734372693-CreateWithdrawRequest.js.map