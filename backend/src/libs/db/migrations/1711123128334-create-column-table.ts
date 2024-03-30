import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnTable1711123128334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `
            CREATE TABLE IF NOT EXISTS task_column  (
                id SERIAL PRIMARY KEY,
                title VARCHAR NOT NULL,
                description TEXT,
                position FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        await queryRunner.query(`
        ALTER TABLE task
            ADD CONSTRAINT FK_Task_ColumnId FOREIGN KEY (column_id)
            REFERENCES task_column(id) ON DELETE CASCADE;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS task_column
        `);
    }
}