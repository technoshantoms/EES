import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AlterTableDepositAddExternalBlockchainRedeemTxHash1673549379592 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
