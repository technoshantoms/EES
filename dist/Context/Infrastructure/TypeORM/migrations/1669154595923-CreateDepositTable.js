"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepositTable1669154595923 = void 0;
class CreateDepositTable1669154595923 {
    constructor() {
        this.name = "CreateDepositTable1669154595923";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`deposit\` (\`id\` varchar(255) NOT NULL, \`native_account\` varchar(255) NOT NULL, \`hash_lock\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`deposit\``);
    }
}
exports.CreateDepositTable1669154595923 = CreateDepositTable1669154595923;
//# sourceMappingURL=1669154595923-CreateDepositTable.js.map