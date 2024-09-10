"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveExternalIdAndStatusFromInternalContract1677071160348 = void 0;
class RemoveExternalIdAndStatusFromInternalContract1677071160348 {
    constructor() {
        this.name = 'RemoveExternalIdAndStatusFromInternalContract1677071160348';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`internal_contract\` DROP COLUMN \`externalId\``);
        await queryRunner.query(`ALTER TABLE \`internal_contract\` DROP COLUMN \`status\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`internal_contract\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`internal_contract\` ADD \`externalId\` varchar(255) NOT NULL`);
    }
}
exports.RemoveExternalIdAndStatusFromInternalContract1677071160348 = RemoveExternalIdAndStatusFromInternalContract1677071160348;
//# sourceMappingURL=1677071160348-RemoveExternalIdAndStatusFromInternalContract.js.map