"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepositRequestTable1669206919167 = void 0;
class CreateDepositRequestTable1669206919167 {
    constructor() {
        this.name = "CreateDepositRequestTable1669206919167";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`deposit_request\` (\`id\` varchar(255) NOT NULL, \`native_account\` varchar(255) NOT NULL, \`hash_lock\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`deposit_request\``);
    }
}
exports.CreateDepositRequestTable1669206919167 = CreateDepositRequestTable1669206919167;
//# sourceMappingURL=1669206919167-CreateDepositRequestTable.js.map