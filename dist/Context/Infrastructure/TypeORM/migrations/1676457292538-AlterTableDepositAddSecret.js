"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableDepositAddSecret1676457292538 = void 0;
class AlterTableDepositAddSecret1676457292538 {
    constructor() {
        this.name = 'AlterTableDepositAddSecret1676457292538';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`secret\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`secret\``);
    }
}
exports.AlterTableDepositAddSecret1676457292538 = AlterTableDepositAddSecret1676457292538;
//# sourceMappingURL=1676457292538-AlterTableDepositAddSecret.js.map