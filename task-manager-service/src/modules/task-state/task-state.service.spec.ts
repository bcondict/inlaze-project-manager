import { Test, TestingModule } from '@nestjs/testing';
import { TaskStateService } from './task-state.service';

describe('TaskStateService', () => {
  let service: TaskStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskStateService],
    }).compile();

    service = module.get<TaskStateService>(TaskStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
