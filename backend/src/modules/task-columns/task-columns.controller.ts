import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskColumnsService } from './task-columns.service';
import { ColumnDto } from './dto/column.dto';

@Controller('/task-columns')
export class TaskColumnsController {
  constructor(private readonly taskColumnsService: TaskColumnsService) {}

  @Post()
  create(@Body() createTaskColumnDto: ColumnDto) {
    return this.taskColumnsService.create(createTaskColumnDto);
  }

  @Get()
  findAll() {
    return this.taskColumnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskColumnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskColumnDto: ColumnDto) {
    return this.taskColumnsService.update(+id, updateTaskColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskColumnsService.remove(+id);
  }
}
