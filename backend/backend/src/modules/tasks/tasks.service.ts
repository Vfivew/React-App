import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';

import { TaskColumn } from 'src/modules/task-columns/entities/task-column.entity';
import { HistoryOfChangesTask } from 'src/modules/history-of-changes-task/entities/history-of-changes-task.entity';
import { HTTPCode, HTTPError } from 'src/libs/http/http';
import { ErrorMessage, Position, ArrayLenght } from './enums/enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    @InjectRepository(HistoryOfChangesTask)
    private historyOfChangesTaskRepository: Repository<HistoryOfChangesTask>,
  ) {}

  async create(createTaskDto: TaskDto): Promise<TaskDto | undefined> {
    const { columnId, ...taskData } = createTaskDto;
    const column = await this.taskColumnRepository.findOne({
      where: { id: columnId },
    });

    if (!column) {
      throw new HTTPError({
        message: ErrorMessage.COLUMN_NOT_FOUND,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    let tasksInTargerColumn = (
      await this.taskRepository.find({ relations: ['column'] })
    )
      .filter((tasl: Task) => tasl.column.id == columnId)
      .sort(
        (previous: Task, current: Task) => previous.position - current.position,
      );

    let targetPos =
      tasksInTargerColumn.length > ArrayLenght.ZERO
        ? tasksInTargerColumn[ArrayLenght.ZERO].position / Position.DIVIDE_BY_TWO
        : Position.DEFAULT_POSITION;

    taskData.position = targetPos;

    const newTask = this.taskRepository.create({ ...taskData, column });

    const savedTask = await this.taskRepository.save(newTask);

    const item = this.historyOfChangesTaskRepository.create({
      description: `Task ${savedTask.title} was create`,
      task: savedTask,
      created_at: new Date(),
    });

    this.historyOfChangesTaskRepository.save(item);

    return {
      id: savedTask.id,
      title: savedTask.title,
      description: savedTask.description,
      position: savedTask.position,
      created_at: savedTask.created_at,
      updated_at: savedTask.updated_at,
      columnId: column.id,
      column: {
        id: column.id,
        title: column.title,
        position: column.position,
        created_at: column.created_at,
        updated_at: column.updated_at,
      },
      due_date: savedTask.due_date,
    };
  }

  async findAll(): Promise<TaskDto[] | undefined> {
    const tasks = await this.taskRepository.find({ relations: ['column'] });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
      created_at: task.created_at,
      updated_at: task.updated_at,
      columnId: task.column.id,
      column: {
        id: task.column.id,
        title: task.column.title,
        position: task.column.position,
        created_at: task.column.created_at,
        updated_at: task.column.updated_at,
      },

      due_date: task.due_date,
    }));
  }

  async findOne(id: number): Promise<TaskDto | undefined> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!task) {
      throw new HTTPError({
        message: ErrorMessage.TASK_NOT_FOUND,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
      created_at: task.created_at,
      updated_at: task.updated_at,
      columnId: task.column.id,
      column: {
        id: task.column.id,
        title: task.column.title,
        position: task.column.position,
        created_at: task.column.created_at,
        updated_at: task.column.updated_at,
      },

      due_date: task.due_date,
    };
  }

  async update(
    id: number,
    updateTaskDto: TaskDto,
  ): Promise<TaskDto | undefined> {
    const {
      title,
      description,
      position,
      created_at,
      updated_at,
      columnId,
      due_date,

    } = updateTaskDto;

    let taskToUpdate = await this.taskRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!taskToUpdate) {
      throw new HTTPError({
        message: ErrorMessage.TASK_NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      });
    }

    const column = await this.taskColumnRepository.findOne({
      where: { id: columnId },
    });

    if (!column) {
      throw new HTTPError({
        message: ErrorMessage.COLUMN_NOT_FOUND,
        status: HTTPCode.NOT_FOUND,
      });
    }

    const newRecord = [];

    if (taskToUpdate.title !== title) {
      newRecord.push(
        `Title changed from "${taskToUpdate.title}" to "${title}"`,
      );
    }

    if (taskToUpdate.description !== description) {
      newRecord.push(
        `Description changed from "${taskToUpdate.description}" to "${description}"`,
      );
    }

    if (taskToUpdate.column.id !== columnId) {
      newRecord.push(
        `Column changed from "${taskToUpdate.column.title}" to "${column.title}"`,
      );
    }

    if (newRecord.length > 0) {
      const item = this.historyOfChangesTaskRepository.create({
        description: `Changes: ${newRecord.join(', ')}`,
        task: taskToUpdate,
        created_at: new Date(),
      });

      this.historyOfChangesTaskRepository.save(item);
    }

    taskToUpdate.title = title;
    taskToUpdate.due_date = due_date;
    taskToUpdate.description = description;
    taskToUpdate.position = position;
    taskToUpdate.created_at = created_at;
    taskToUpdate.updated_at = updated_at;
    taskToUpdate.column = column;

    await this.taskRepository.save(taskToUpdate);

    return {
      id: taskToUpdate.id,
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      position: taskToUpdate.position,
      created_at: taskToUpdate.created_at,
      updated_at: taskToUpdate.updated_at,
      columnId: column.id,
      column: {
        id: column.id,
        title: column.title,
        position: column.position,
        created_at: column.created_at,
        updated_at: column.updated_at,
      },
      due_date: taskToUpdate.due_date,
    };
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
  }
}
