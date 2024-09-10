import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveHashlockFromWithdrawRequest1682661680037 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
