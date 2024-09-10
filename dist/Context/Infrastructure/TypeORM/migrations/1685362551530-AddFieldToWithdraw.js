"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldToWithdraw1685362551530 = void 0;
class AddFieldToWithdraw1685362551530 {
    constructor() {
        this.name = "AddFieldToWithdraw1685362551530";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`internal_redeem_block_number\` int NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`internal_redeem_block_number\``);
    }
}
exports.AddFieldToWithdraw1685362551530 = AddFieldToWithdraw1685362551530;
//# sourceMappingURL=1685362551530-AddFieldToWithdraw.js.map