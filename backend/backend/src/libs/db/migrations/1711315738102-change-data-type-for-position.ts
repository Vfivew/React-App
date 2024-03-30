import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDataTypeForPosition1711315738102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE task
        ALTER COLUMN position TYPE FLOAT;
    `);

        await queryRunner.query(`
        ALTER TABLE task_column
        ALTER COLUMN position TYPE FLOAT;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE task
        ALTER COLUMN position TYPE INTEGER;
    `);

        await queryRunner.query(`
        ALTER TABLE task_column
        ALTER COLUMN position TYPE INTEGER;
    `);
    }

}
