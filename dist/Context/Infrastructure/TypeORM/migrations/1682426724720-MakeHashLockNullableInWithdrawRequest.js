"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeHashLockNullableInWithdrawRequest1682426724720 = void 0;
class MakeHashLockNullableInWithdrawRequest1682426724720 {
    constructor() {
        this.name = "MakeHashLockNullableInWithdrawRequest1682426724720";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`deposit_request\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw_request\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`external_contract\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`deposit_request\` CHANGE \`hash_lock\` \`hash_lock\` varchar(255) NOT NULL`);
    }
}
exports.MakeHashLockNullableInWithdrawRequest1682426724720 = MakeHashLockNullableInWithdrawRequest1682426724720;
//# sourceMappingURL=1682426724720-MakeHashLockNullableInWithdrawRequest.js.map