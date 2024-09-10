"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveHashlockFromWithdrawRequest1682661680037 = void 0;
class RemoveHashlockFromWithdrawRequest1682661680037 {
    constructor() {
        this.name = "RemoveHashlockFromWithdrawRequest1682661680037";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` DROP COLUMN \`hash_lock\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` ADD \`hash_lock\` varchar(255) NULL`);
    }
}
exports.RemoveHashlockFromWithdrawRequest1682661680037 = RemoveHashlockFromWithdrawRequest1682661680037;
//# sourceMappingURL=1682661680037-RemoveHashlockFromWithdrawRequest.js.map