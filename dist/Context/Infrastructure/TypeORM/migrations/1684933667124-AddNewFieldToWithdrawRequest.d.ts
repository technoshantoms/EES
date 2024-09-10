import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewFieldToWithdrawRequest1684933667124 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
