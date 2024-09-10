import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateInternalContractTable1673200918768 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
