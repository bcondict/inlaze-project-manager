import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskStateService } from '../task-state/task-state.service';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, TaskStateService, CommentService],
})
export class TaskModule {}
