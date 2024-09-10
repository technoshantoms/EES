"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTxHashToWithdraw1683536302958 = void 0;
class AddTxHashToWithdraw1683536302958 {
    constructor() {
        this.name = "AddTxHashToWithdraw1683536302958";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD \`tx_hash\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP COLUMN \`tx_hash\``);
    }
}
exports.AddTxHashToWithdraw1683536302958 = AddTxHashToWithdraw1683536302958;
//# sourceMappingURL=1683536302958-AddTxHashToWithdraw.js.map