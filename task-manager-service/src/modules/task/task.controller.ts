import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskStateEntitiy } from 'src/domain/entities/task/taskState.entity';
import { TaskStateService } from '../task-state/task-state.service';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from 'src/domain/entities/comment/comment.entity';

@Controller({ version: '1', path: 'manager/task' })
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskStateService: TaskStateService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  async createTask(
    @Body('task') task: TaskEntity,
    @Body('taskState') taskState: TaskStateEntitiy,
  ): Promise<TaskEntity> {
    await this.taskStateService.createTaskState(taskState);
    return this.taskService.createTask(task);
  }

  @Get()
  async readTask(taskId: string): Promise<TaskEntity> {
    return this.taskService.readTask(taskId);
  }

  @Patch('/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() task: Partial<TaskEntity>,
  ): Promise<object> {
    return this.taskService.updateTask(taskId, task);
  }

  @Delete('/:taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<object> {
    return this.taskService.deleteTask(taskId);
  }

  /* taskState */
  @Get('/:taskId/task_state/')
  async createTaskState(
    @Param('taskId') taskId: string,
  ): Promise<TaskStateEntitiy> {
    return this.taskStateService.readTaskState(taskId);
  }

  @Delete('/:taskId/task_state/:taskStateId')
  async deleteTaskState(
    @Param('taskId') taskId: string,
    @Param('taskStateId') taskStateId: string,
  ): Promise<object> {
    return this.taskStateService.deleteTaskState(taskStateId, taskId);
  }

  /* comments */
  @Get('/:taskId/comments')
  async readComment(@Param('taskId') taskId: string): Promise<CommentEntity[]> {
    return this.commentService.readTaskComments(taskId);
  }
}
