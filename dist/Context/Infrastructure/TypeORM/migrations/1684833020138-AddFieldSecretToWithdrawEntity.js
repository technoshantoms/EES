"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldSecretToWithdrawEntity1684833020138 = void 0;
class AddFieldSecretToWithdrawEntity1684833020138 {
    constructor() {
        this.name = "AddFieldSecretToWithdrawEntity1684833020138";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`secret\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`secret\``);
    }
}
exports.AddFieldSecretToWithdrawEntity1684833020138 = AddFieldSecretToWithdrawEntity1684833020138;
//# sourceMappingURL=1684833020138-AddFieldSecretToWithdrawEntity.js.map