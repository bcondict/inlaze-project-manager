import { Module } from '@nestjs/common';
import { TaskStateController } from './task-state.controller';
import { TaskStateService } from './task-state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStateEntitiy } from 'src/domain/entities/task/taskState.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStateEntitiy])],
  controllers: [TaskStateController],
  providers: [TaskStateService],
})
export class TaskStateModule {}
