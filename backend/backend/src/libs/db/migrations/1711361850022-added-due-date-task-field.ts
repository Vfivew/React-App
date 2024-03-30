import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDueDateTaskField1711361850022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE task
        ADD due_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE task
        DROP COLUMN IF EXISTS due_date
    `);
    }

}
