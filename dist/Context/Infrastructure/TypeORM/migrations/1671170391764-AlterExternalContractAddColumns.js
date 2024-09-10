"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterExternalContractAddColumns1671170391764 = void 0;
class AlterExternalContractAddColumns1671170391764 {
    constructor() {
        this.name = 'AlterExternalContractAddColumns1671170391764';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`sender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`receiver\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`value\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`hash_lock\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`time_lock\` datetime NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`time_lock\``);
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`hash_lock\``);
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`receiver\``);
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`sender\``);
    }
}
exports.AlterExternalContractAddColumns1671170391764 = AlterExternalContractAddColumns1671170391764;
//# sourceMappingURL=1671170391764-AlterExternalContractAddColumns.js.map