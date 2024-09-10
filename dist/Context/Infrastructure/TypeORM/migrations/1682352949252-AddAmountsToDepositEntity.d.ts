import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddAmountsToDepositEntity1682352949252 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
