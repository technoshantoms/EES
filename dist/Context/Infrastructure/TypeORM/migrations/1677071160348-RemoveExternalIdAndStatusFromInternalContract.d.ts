import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveExternalIdAndStatusFromInternalContract1677071160348 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
