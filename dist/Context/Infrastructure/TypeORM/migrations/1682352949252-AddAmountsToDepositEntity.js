"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAmountsToDepositEntity1682352949252 = void 0;
class AddAmountsToDepositEntity1682352949252 {
    constructor() {
        this.name = "AddAmountsToDepositEntity1682352949252";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`minted_amount\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`burned_amount\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`burned_amount\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`minted_amount\``);
    }
}
exports.AddAmountsToDepositEntity1682352949252 = AddAmountsToDepositEntity1682352949252;
//# sourceMappingURL=1682352949252-AddAmountsToDepositEntity.js.map