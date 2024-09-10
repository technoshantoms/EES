"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInternalContractTable1673200918768 = void 0;
class CreateInternalContractTable1673200918768 {
    constructor() {
        this.name = 'CreateInternalContractTable1673200918768';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`internal_contract\` (\`id\` int NOT NULL AUTO_INCREMENT, \`internalId\` varchar(255) NOT NULL, \`externalId\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`internal_contract_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD UNIQUE INDEX \`IDX_6cc3eee6365b0a115875d7b35a\` (\`internal_contract_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6cc3eee6365b0a115875d7b35a\` ON \`deposit\` (\`internal_contract_id\`)`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_6cc3eee6365b0a115875d7b35a8\` FOREIGN KEY (\`internal_contract_id\`) REFERENCES \`internal_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_6cc3eee6365b0a115875d7b35a8\``);
        await queryRunner.query(`DROP INDEX \`REL_6cc3eee6365b0a115875d7b35a\` ON \`deposit\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP INDEX \`IDX_6cc3eee6365b0a115875d7b35a\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`internal_contract_id\``);
        await queryRunner.query(`DROP TABLE \`internal_contract\``);
    }
}
exports.CreateInternalContractTable1673200918768 = CreateInternalContractTable1673200918768;
//# sourceMappingURL=1673200918768-CreateInternalContractTable.js.map