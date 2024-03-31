import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Task } from '../../modules/tasks/entities/task.entity';
import { TaskColumn } from '../../modules/task-columns/entities/task-column.entity';
import { HistoryOfChangesTaskModule } from 'src/modules/history-of-changes-task/history-of-changes-task.module';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: 'postgres://board_vji9_user:jVHK4rWlBauFbKSuUbLEwZMelS3fjZsS@dpg-co4hq5sf7o1s738sepe0-a.frankfurt-postgres.render.com/board_vji9',
  port: '5432',
  username: 'board_vji9_user',
  password: 'jVHK4rWlBauFbKSuUbLEwZMelS3fjZsS',
  database: 'board_vji9',
  entities: [Task, TaskColumn, HistoryOfChangesTaskModule],
  migrations: ['dist/libs/db/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
