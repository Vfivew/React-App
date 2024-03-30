import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskColumn } from 'src/modules/task-columns/entities/task-column.entity';
import { HistoryOfChangesTask } from 'src/modules/history-of-changes-task/entities/history-of-changes-task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([TaskColumn]),
    TypeOrmModule.forFeature([HistoryOfChangesTask]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
