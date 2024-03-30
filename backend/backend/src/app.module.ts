import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeorm from './libs/config/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { TaskColumnsModule } from './modules/task-columns/task-columns.module';
import { HistoryOfChangesTaskModule } from './modules/history-of-changes-task/history-of-changes-task.module';

@Module({
  imports: [
    TasksModule,
    TaskColumnsModule,
    AutomapperModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    HistoryOfChangesTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
