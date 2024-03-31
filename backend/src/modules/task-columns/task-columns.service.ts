import { Injectable } from '@nestjs/common';
import { ColumnDto } from './dto/column.dto';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayLenght, Position } from './enums/enums';
import { HTTPCode, HTTPError } from 'src/libs/http/http';
import { ErrorMessage } from 'src/modules/tasks/enums/enums';

@Injectable()
export class TaskColumnsService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
  ) {}

  async create(columnData: ColumnDto) {
    let columnn = (await this.taskColumnRepository.find()).sort(
      (previous: TaskColumn, current: TaskColumn) =>
        previous.position - current.position,
    );

    let targetPosition =
      columnn.length > ArrayLenght.ZERO
        ? columnn[ArrayLenght.ZERO].position / Position.DIVIDE_BY_TWO
        : Position.DEFAULT_POSITION;

    columnData.position = targetPosition;

    const newColumn = this.taskColumnRepository.create({
      ...columnData,
    });

    const savedTask = await this.taskColumnRepository.save(newColumn);

    return savedTask;
  }

  findAll() {
    return this.taskColumnRepository.find();
  }

  findOne(id: number) {
    return this.taskColumnRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskColumnDto: ColumnDto) {
    const taskColumnToUpdate = await this.taskColumnRepository.findOne({
      where: { id },
    });

    if (!taskColumnToUpdate) {
      throw new HTTPError({
        message: ErrorMessage.TASK_NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      });
    }

    taskColumnToUpdate.title = updateTaskColumnDto.title;
    taskColumnToUpdate.position = updateTaskColumnDto.position;
    taskColumnToUpdate.created_at = updateTaskColumnDto.created_at;
    taskColumnToUpdate.updated_at = updateTaskColumnDto.updated_at;

    return await this.taskColumnRepository.save(taskColumnToUpdate);
  }

  async remove(id: number) {
    await this.taskColumnRepository.delete(id);
  }
}
