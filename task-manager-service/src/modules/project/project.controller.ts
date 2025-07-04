import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectEntitiy } from 'src/domain/entities/project/project.entity';
import { ProjectService } from './project.service';
import { TaskService } from '../task/task.service';
import { TaskEntity } from 'src/domain/entities/task/task.entity';

@Controller({ version: '1', path: 'manager/projects/' })
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  @Post()
  async createProject(project: ProjectEntitiy): Promise<ProjectEntitiy> {
    return this.projectService.createProject(project);
  }

  @Get()
  async readProjects(): Promise<ProjectEntitiy[]> {
    return this.projectService.readProjects();
  }

  @Get('/:projectId')
  async readProject(
    @Param('projectId') projectId: string,
  ): Promise<ProjectEntitiy> {
    return this.projectService.readProject(projectId);
  }

  @Get('/:projectId/tasks')
  async readProjectTasks(
    @Param('projectId') projectId: string,
  ): Promise<TaskEntity[]> {
    return this.taskService.readProjectTasks(projectId);
  }
}
