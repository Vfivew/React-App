import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityToTask1711395562561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        await queryRunner.query(`
            CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH');
        `);

        await queryRunner.query(`
            ALTER TABLE task
            ADD COLUMN priority priority DEFAULT 'LOW'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


}
}