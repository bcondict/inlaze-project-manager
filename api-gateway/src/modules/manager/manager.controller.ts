import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ProjectScheme } from './schemes/project.scheme';
import { TaskScheme } from './schemes/task.scheme';
import { TaskUpdater } from './schemes/taskUpdater.scheme';
import { TeamScheme } from './schemes/team.scheme';
import { CommentScheme } from './schemes/comment.scheme';

@Controller({ version: '1', path: 'manager' })
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  /* projects */
  @Post('projects')
  async createProject(@Body() project: ProjectScheme) {
    return this.managerService.createProject(project);
  }
  @Get('projects')
  async readProjects() {
    return this.managerService.readProjects();
  }

  /* tasks */
  @Get('projects/:projectId/tasks')
  async readProjectTasks(@Param('projectId') projectId: string) {
    return this.managerService.readProjectTasks(projectId);
  }
  @Post('projects/:projectId/tasks')
  async createTask(
    @Param('projectId') projectId: string,
    @Body() task: TaskScheme,
  ) {
    return this.managerService.createTask(projectId, task);
  }
  @Get('tasks/:taskId')
  async readTask(@Param('taskId') taskId: string) {
    return this.managerService.readTask(taskId);
  }
  @Patch('tasks/:id')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() taskUpdater: TaskUpdater,
  ) {
    return this.managerService.updateTask({ taskId, taskUpdater });
  }
  @Delete('tasks/:id/delete')
  async deleteTask(@Param('taskId') taskId: string) {
    return this.managerService.deleteTask(taskId);
  }

  /* teams */
  @Get('manager/teams')
  async readTeams() {
    return this.managerService.readTeams();
  }
  @Post('manager/teams')
  async createTeams(@Body() team: TeamScheme) {
    return this.managerService.createTeams(team);
  }
  @Get('manager/teams/:teamId')
  async readTeam(@Param('teamId') teamId: string) {
    return this.managerService.readTeam(teamId);
  }

  /* comments */
  @Post('manager/comments')
  async createComment(@Body() comment: CommentScheme) {
    return this.managerService.createComment(comment);
  }
  @Get('manager/task/:taskid/comments')
  async readComments(@Param('taskId') taskId: string) {
    return this.managerService.readComments(taskId);
  }
}
