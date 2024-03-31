import { Module } from '@nestjs/common';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';
import { HistoryOfChangesTaskController } from './history-of-changes-task.controller';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryOfChangesTask } from './entities/history-of-changes-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  TypeOrmModule.forFeature([HistoryOfChangesTask]),],
  controllers: [HistoryOfChangesTaskController],
  providers: [HistoryOfChangesTaskService],
})

export class HistoryOfChangesTaskModule {}
