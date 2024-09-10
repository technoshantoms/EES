"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBurnInternalTxHashToDeposit1679924185289 = void 0;
class AddBurnInternalTxHashToDeposit1679924185289 {
    constructor() {
        this.name = "AddBurnInternalTxHashToDeposit1679924185289";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD \`internal_blockchain_burn_tx_hash\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP COLUMN \`internal_blockchain_burn_tx_hash\``);
    }
}
exports.AddBurnInternalTxHashToDeposit1679924185289 = AddBurnInternalTxHashToDeposit1679924185289;
//# sourceMappingURL=1679924185289-AddBurnInternalTxHashToDeposit.js.map