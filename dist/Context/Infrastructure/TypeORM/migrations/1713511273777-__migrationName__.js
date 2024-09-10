"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._MigrationName_1713511273777 = void 0;
class _MigrationName_1713511273777 {
    constructor() {
        this.name = '_MigrationName_1713511273777';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`deposit_request\` (\`id\` varchar(255) NOT NULL, \`native_account\` varchar(255) NOT NULL, \`hash_lock\` varchar(255) NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deposit\` (\`id\` varchar(255) NOT NULL, \`secret\` varchar(255) NULL, \`external_blockchain_redeem_tx_hash\` varchar(255) NULL, \`internal_blockchain_burn_tx_hash\` varchar(255) NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`minted_amount\` varchar(255) NULL, \`burned_amount\` varchar(255) NULL, \`deposit_request_id\` varchar(255) NULL, \`external_contract_id\` varchar(255) NULL, \`internal_contract_id\` varchar(255) NULL, UNIQUE INDEX \`REL_579bbfff76624a8e2bfdbf8d66\` (\`deposit_request_id\`), UNIQUE INDEX \`REL_e0920857a2b620f4541617c8d7\` (\`external_contract_id\`), UNIQUE INDEX \`REL_6cc3eee6365b0a115875d7b35a\` (\`internal_contract_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`external_contract\` (\`id\` varchar(255) NOT NULL, \`sender\` varchar(255) NOT NULL, \`receiver\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`hash_lock\` varchar(255) NULL, \`time_lock\` datetime NOT NULL, \`tx_hash\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`internal_contract\` (\`id\` varchar(255) NOT NULL, \`internalId\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`setting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`name_idx\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`withdraw_request\` (\`id\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`native_account\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`amount_to_pay_in_RQETH\` decimal(15,5) NOT NULL, \`address_of_user_in_ethereum\` varchar(255) NOT NULL, \`withdrawal_fee_amount\` decimal(15,5) NOT NULL, \`withdrawal_fee_currency\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`withdraw\` (\`id\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`transfer_operation_id\` varchar(255) NOT NULL, \`htlc_create_operation_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`error_message\` varchar(255) NULL, \`secret\` varchar(255) NULL, \`hashlock\` varchar(255) NULL, \`timelock\` int NULL, \`amount_of_htlc\` int NULL, \`amount_of_withdrawal_fee\` int NULL, \`asset_of_withdrawal_fee\` varchar(255) NULL, \`tx_hash\` varchar(255) NULL, \`external_blockchain_redeem_tx_hash\` varchar(255) NULL, \`internal_redeem_block_number\` int NULL, \`external_blockchain_refund_tx_hash\` varchar(255) NULL, \`withdraw_request_id\` varchar(255) NULL, \`external_contract_id\` varchar(255) NOT NULL, \`internal_contract_id\` varchar(255) NULL, UNIQUE INDEX \`REL_33e63055f106a932514ef174bf\` (\`withdraw_request_id\`), UNIQUE INDEX \`REL_c46ae98dca500a71386f46ec5d\` (\`external_contract_id\`), UNIQUE INDEX \`REL_7f4c9a7ed17af305d05a755d84\` (\`internal_contract_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_579bbfff76624a8e2bfdbf8d662\` FOREIGN KEY (\`deposit_request_id\`) REFERENCES \`deposit_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_e0920857a2b620f4541617c8d74\` FOREIGN KEY (\`external_contract_id\`) REFERENCES \`external_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deposit\` ADD CONSTRAINT \`FK_6cc3eee6365b0a115875d7b35a8\` FOREIGN KEY (\`internal_contract_id\`) REFERENCES \`internal_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD CONSTRAINT \`FK_33e63055f106a932514ef174bfa\` FOREIGN KEY (\`withdraw_request_id\`) REFERENCES \`withdraw_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD CONSTRAINT \`FK_c46ae98dca500a71386f46ec5d7\` FOREIGN KEY (\`external_contract_id\`) REFERENCES \`external_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`withdraw\` ADD CONSTRAINT \`FK_7f4c9a7ed17af305d05a755d845\` FOREIGN KEY (\`internal_contract_id\`) REFERENCES \`internal_contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP FOREIGN KEY \`FK_7f4c9a7ed17af305d05a755d845\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP FOREIGN KEY \`FK_c46ae98dca500a71386f46ec5d7\``);
        await queryRunner.query(`ALTER TABLE \`withdraw\` DROP FOREIGN KEY \`FK_33e63055f106a932514ef174bfa\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_6cc3eee6365b0a115875d7b35a8\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_e0920857a2b620f4541617c8d74\``);
        await queryRunner.query(`ALTER TABLE \`deposit\` DROP FOREIGN KEY \`FK_579bbfff76624a8e2bfdbf8d662\``);
        await queryRunner.query(`DROP INDEX \`REL_7f4c9a7ed17af305d05a755d84\` ON \`withdraw\``);
        await queryRunner.query(`DROP INDEX \`REL_c46ae98dca500a71386f46ec5d\` ON \`withdraw\``);
        await queryRunner.query(`DROP INDEX \`REL_33e63055f106a932514ef174bf\` ON \`withdraw\``);
        await queryRunner.query(`DROP TABLE \`withdraw\``);
        await queryRunner.query(`DROP TABLE \`withdraw_request\``);
        await queryRunner.query(`DROP INDEX \`name_idx\` ON \`setting\``);
        await queryRunner.query(`DROP TABLE \`setting\``);
        await queryRunner.query(`DROP TABLE \`internal_contract\``);
        await queryRunner.query(`DROP TABLE \`external_contract\``);
        await queryRunner.query(`DROP INDEX \`REL_6cc3eee6365b0a115875d7b35a\` ON \`deposit\``);
        await queryRunner.query(`DROP INDEX \`REL_e0920857a2b620f4541617c8d7\` ON \`deposit\``);
        await queryRunner.query(`DROP INDEX \`REL_579bbfff76624a8e2bfdbf8d66\` ON \`deposit\``);
        await queryRunner.query(`DROP TABLE \`deposit\``);
        await queryRunner.query(`DROP TABLE \`deposit_request\``);
    }
}
exports._MigrationName_1713511273777 = _MigrationName_1713511273777;
//# sourceMappingURL=1713511273777-__migrationName__.js.map