import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiParam } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: TaskDto): Promise<TaskDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get('')
  async GetAllTasks(@Param() params: any): Promise<TaskDto[]> {
    const tasks = await this.tasksService.findAll();
    return tasks ? tasks : [];
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Task ID' })
  async GetTaskById(@Param() params: any): Promise<TaskDto> | null {
    const task = await this.tasksService.findOne(params.id);

    return task ? task : null;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: TaskDto) {
    const task = await this.tasksService.update(+id, updateTaskDto);

    return task;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
