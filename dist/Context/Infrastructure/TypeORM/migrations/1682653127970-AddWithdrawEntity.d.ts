import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddWithdrawEntity1682653127970 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
