import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from '../../modules/tasks/entities/task.entity';
import { TaskColumn } from '../../modules/task-columns/entities/task-column.entity';
import { HistoryOfChangesTaskModule } from 'src/modules/history-of-changes-task/history-of-changes-task.module';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [Task, TaskColumn, HistoryOfChangesTaskModule],
    migrations: ["dist/libs/db/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations"
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);