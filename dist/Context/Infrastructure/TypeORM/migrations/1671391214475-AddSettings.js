"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSettings1671391214475 = void 0;
class AddSettings1671391214475 {
    constructor() {
        this.name = 'AddSettings1671391214475';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`setting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`name_idx\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`name_idx\` ON \`setting\``);
        await queryRunner.query(`DROP TABLE \`setting\``);
    }
}
exports.AddSettings1671391214475 = AddSettings1671391214475;
//# sourceMappingURL=1671391214475-AddSettings.js.map