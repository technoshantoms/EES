import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFieldsToWithdrawRequest1682663683463 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
