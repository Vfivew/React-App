import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHistoryOfChanges1711462354043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS history_of_changes_task (
        id SERIAL PRIMARY KEY,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        task_id INTEGER,
        CONSTRAINT FK_Task_Id FOREIGN KEY (task_id)
          REFERENCES task(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS history_of_changes_task;
    `);
  }
}
