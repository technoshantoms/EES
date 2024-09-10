import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddBurnInternalTxHashToDeposit1679924185289 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
