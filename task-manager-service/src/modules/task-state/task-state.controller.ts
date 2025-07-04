import { Body, Controller, Post } from '@nestjs/common';
import { TaskStateService } from './task-state.service';
import { TaskStateEntitiy } from 'src/domain/entities/task/taskState.entity';

@Controller({ version: '1', path: 'manager/task_state' })
export class TaskStateController {
  constructor(private readonly taskStateService: TaskStateService) {}

  @Post()
  async createTaskState(
    @Body() taskState: TaskStateEntitiy,
  ): Promise<TaskStateEntitiy> {
    return this.taskStateService.createTaskState(taskState);
  }
}
