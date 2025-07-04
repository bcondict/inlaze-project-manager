import { Test, TestingModule } from '@nestjs/testing';
import { TaskStateController } from './task-state.controller';

describe('TaskStateController', () => {
  let controller: TaskStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskStateController],
    }).compile();

    controller = module.get<TaskStateController>(TaskStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
