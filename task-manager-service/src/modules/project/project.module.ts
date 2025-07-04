import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntitiy } from 'src/domain/entities/project/project.entity';
import { TaskService } from '../task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntitiy])],
  controllers: [ProjectController],
  providers: [ProjectService, TaskService],
})
export class ProjectModule {}
