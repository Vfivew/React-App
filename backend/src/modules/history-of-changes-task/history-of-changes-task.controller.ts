import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';
import { CreateHistoryOfChangesTaskDto } from './dto/create-history-of-changes-task.dto';

@Controller('history-of-changes-task')
export class HistoryOfChangesTaskController {
  constructor(private readonly historyOfChangesTaskService: HistoryOfChangesTaskService) {}

  @Post()
  create(@Body() createHistoryOfChangesTaskDto: CreateHistoryOfChangesTaskDto) {
    return this.historyOfChangesTaskService.create(createHistoryOfChangesTaskDto);
  }

  @Get()
  findAll() {
    return this.historyOfChangesTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyOfChangesTaskService.findAllByTaskId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.historyOfChangesTaskService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyOfChangesTaskService.remove(+id);
  }
}
