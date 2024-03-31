import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOfChangesTaskController } from './history-of-changes-task.controller';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';

describe('HistoryOfChangesTaskController', () => {
  let controller: HistoryOfChangesTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryOfChangesTaskController],
      providers: [HistoryOfChangesTaskService],
    }).compile();

    controller = module.get<HistoryOfChangesTaskController>(HistoryOfChangesTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
