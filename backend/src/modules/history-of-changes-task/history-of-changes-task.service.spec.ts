import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOfChangesTaskService } from './history-of-changes-task.service';

describe('HistoryOfChangesTaskService', () => {
  let service: HistoryOfChangesTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryOfChangesTaskService],
    }).compile();

    service = module.get<HistoryOfChangesTaskService>(HistoryOfChangesTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
