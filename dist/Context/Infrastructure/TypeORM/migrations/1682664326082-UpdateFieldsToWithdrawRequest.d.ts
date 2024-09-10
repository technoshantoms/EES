import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateFieldsToWithdrawRequest1682664326082 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
