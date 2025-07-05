import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { TaskStateService } from '../task-state/task-state.service';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), CommentModule],
  controllers: [TaskController],
  providers: [TaskService, TaskStateService],
})
export class TaskModule {}
