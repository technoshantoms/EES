import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AlterExternalContractAddTxHash1675867776847 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
