import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFieldToWithdrawEntity1685541355100 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
