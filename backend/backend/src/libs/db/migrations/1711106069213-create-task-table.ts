import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1711106069213 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS task (
                id SERIAL PRIMARY KEY,
                column_id INTEGER,
                title VARCHAR NOT NULL,
                description TEXT,
                position FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS task
        `);
    }
}