"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterExternalContractAddTxHash1675867776847 = void 0;
class AlterExternalContractAddTxHash1675867776847 {
    constructor() {
        this.name = 'AlterExternalContractAddTxHash1675867776847';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`external_contract\` ADD \`tx_hash\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`external_contract\` DROP COLUMN \`tx_hash\``);
    }
}
exports.AlterExternalContractAddTxHash1675867776847 = AlterExternalContractAddTxHash1675867776847;
//# sourceMappingURL=1675867776847-AlterExternalContractAddTxHash.js.map