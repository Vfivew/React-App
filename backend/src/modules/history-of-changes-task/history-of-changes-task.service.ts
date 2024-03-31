import { Injectable } from '@nestjs/common';
import { CreateHistoryOfChangesTaskDto } from './dto/create-history-of-changes-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { HistoryOfChangesTask } from './entities/history-of-changes-task.entity';

@Injectable()
export class HistoryOfChangesTaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(HistoryOfChangesTask)
    private historyOfChangesTaskRepository: Repository<HistoryOfChangesTask>,
  ) {}

  async create(createHistoryOfChangesTaskDto: CreateHistoryOfChangesTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: createHistoryOfChangesTaskDto.task_id },
      relations: ['column'],
    });

    const newRecord = this.historyOfChangesTaskRepository.create({
      ...createHistoryOfChangesTaskDto,
      task: task,
    });
    const history = await this.historyOfChangesTaskRepository.save({
      ...newRecord,
    });

    return history;
  }

  async findAllByTaskId(id: number) {
    return await this.historyOfChangesTaskRepository.find({
      where: { task: { id: id } },
      relations: ['task'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findAll() {
    const history = await this.historyOfChangesTaskRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return history;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyOfChangesTask`;
  }

  update(
    id: number
  ) {
    return `This action updates a #${id} historyOfChangesTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyOfChangesTask`;
  }
}
