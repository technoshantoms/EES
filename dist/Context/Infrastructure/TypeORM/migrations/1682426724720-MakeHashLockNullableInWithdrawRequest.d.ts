import { MigrationInterface, QueryRunner } from "typeorm";
export declare class MakeHashLockNullableInWithdrawRequest1682426724720 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
