"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterDepositEntityAddRelations1669286186388 = void 0;
class AlterDepositEntityAddRelations1669286186388 {
    constructor() {
        this.name = "AlterDepositEntityAddRelations1669286186388";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`external_contract\` (\`id\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`hash_lock\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`native_account\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`deposit_request_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD UNIQUE INDEX \`IDX_579bbfff76624a8e2bfdbf8d66\` (\`deposit_request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`external_contract_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD UNIQUE INDEX \`IDX_e0920857a2b620f4541617c8d7\` (\`external_contract_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_579bbfff76624a8e2bfdbf8d66\` ON \`deposit\` (\`deposit_request_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e0920857a2b620f4541617c8d7\` ON \`deposit\` (\`external_contract_id\`)`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_579bbfff76624a8e2bfdbf8d662\` FOREIGN KEY (\`deposit_request_id\`) REFERENCES \`deposit_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_e0920857a2b620f4541617c8d74\` FOREIGN KEY (\`external_contract_id\`) REFERENCES \`external_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_e0920857a2b620f4541617c8d74\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_579bbfff76624a8e2bfdbf8d662\``);
        await queryRunner.query(`DROP INDEX \`REL_e0920857a2b620f4541617c8d7\` ON \`deposit\``);
        await queryRunner.query(`DROP INDEX \`REL_579bbfff76624a8e2bfdbf8d66\` ON \`deposit\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP INDEX \`IDX_e0920857a2b620f4541617c8d7\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`external_contract_id\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP INDEX \`IDX_579bbfff76624a8e2bfdbf8d66\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`deposit_request_id\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`native_account\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`hash_lock\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`external_contract\``);
    }
}
exports.AlterDepositEntityAddRelations1669286186388 = AlterDepositEntityAddRelations1669286186388;
//# sourceMappingURL=1669286186388-AlterDepositEntityAddRelations.js.map