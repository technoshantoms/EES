import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFieldsToWithdrawEntity1682947758290 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
