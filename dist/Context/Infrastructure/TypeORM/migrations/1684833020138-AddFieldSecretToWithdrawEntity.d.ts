import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFieldSecretToWithdrawEntity1684833020138 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
