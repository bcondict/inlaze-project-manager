import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ProjectScheme } from './schemes/project.scheme';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { TaskScheme } from './schemes/task.scheme';
import { UpdateTaskScheme } from './schemes/updateTask.scheme';
import { TeamScheme } from './schemes/team.scheme';
import { CommentScheme } from './schemes/comment.scheme';
import { UserResponseScheme } from '../authentication/schemes/user-response.scheme';
import { NotifierService } from '../notifier/notifier.service';

@Injectable()
export class ManagerService {
  domainName: string = 'DOMAIN_MANAGER';
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly notifierService: NotifierService,
  ) {}

  get domain(): string {
    return this.configService.get<string>(this.domainName) as string;
  }

  /* projects */
  async createProject(project: ProjectScheme): Promise<ProjectScheme> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.domain}/api/v1/manager/projects`, project),
    );

    const projectResponse = plainToInstance(ProjectScheme, response.data);

    await validateOrReject(projectResponse).catch((error) => {
      this.logger.error(
        `Invalid project creation schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid creation of project schema.',
      );
    });
    return projectResponse;
  }
  async readProjects(): Promise<ProjectScheme[]> {
    const response = await firstValueFrom(
      this.httpService.get<any[]>(`${this.domain}/api/v1/manager/projects`),
    );

    const projectsResponse = plainToInstance(ProjectScheme, response.data);

    await validateOrReject(projectsResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture projects schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid lecture projects schema.',
      );
    });

    return projectsResponse;
  }

  /* tasks */
  async readProjectTasks(projectId: string): Promise<TaskScheme[]> {
    const response = await firstValueFrom(
      this.httpService.get<any[]>(
        `${this.domain}/api/v1/manager/projects/${projectId}/tasks`,
      ),
    );

    const projectsResponse = plainToInstance(TaskScheme, response.data);
    await validateOrReject(projectsResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture project tasks schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid lecture project tasks schema.',
      );
    });

    return projectsResponse;
  }
  async createTask(projectId: string, task: TaskScheme): Promise<TaskScheme> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.domain}/api/v1/manager/project/${projectId}/tasks`,
        task,
      ),
    );

    const taskResponse = plainToInstance(TaskScheme, response.data);
    await validateOrReject(taskResponse).catch((error) => {
      this.logger.error(
        `Invalid creation of task schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid creation task schema.');
    });

    return taskResponse;
  }
  async readTask(taskId: string): Promise<TaskScheme> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.domain}/api/v1/manager/tasks/${taskId}`),
    );

    const taskResponse = plainToInstance(TaskScheme, response.data);
    await validateOrReject(taskResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture task schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid lecture task schema.');
    });

    return taskResponse;
  }
  async updateTask({
    taskUpdater,
    taskId,
  }: UpdateTaskScheme): Promise<TaskScheme> {
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.domain}/api/v1/manager/tasks/${taskId}`,
        taskUpdater,
      ),
    );

    const taskResponse = plainToInstance(TaskScheme, response.data);
    await validateOrReject(taskResponse).catch((error) => {
      this.logger.error(
        `Invalid update of task schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid update of task schema.');
    });

    return taskResponse;
  }
  async deleteTask(taskId: string): Promise<object> {
    await firstValueFrom(
      this.httpService.delete(`${this.domain}/api/v1/manager/tasks/${taskId}`),
    );

    return { taskId: taskId, message: 'Task deleted successfully' };
  }

  /* teams */
  async createTeams(team: TeamScheme): Promise<TeamScheme> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.domain}/api/v1/manager/teams`, team),
    );

    const teamResponse = plainToInstance(TeamScheme, response.data);
    await validateOrReject(teamResponse).catch((error) => {
      this.logger.error(
        `Invalid of team creation schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid lecture of team schema.');
    });

    return teamResponse;
  }
  async readTeams(): Promise<TeamScheme[]> {
    const response = await firstValueFrom(
      this.httpService.get<any[]>(`${this.domain}/api/v1/manager/teams`),
    );

    const teamsResponse = plainToInstance(TeamScheme, response.data);
    await validateOrReject(teamsResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture of teams schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid lecture of team schema.');
    });

    return teamsResponse;
  }
  async readTeam(teamId: string) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.domain}/api/v1/manager/teams/${teamId}`),
    );

    const teamResponse = plainToInstance(TeamScheme, response.data);
    await validateOrReject(teamResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture of team schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException('Invalid lecture of team schema.');
    });

    return teamResponse;
  }

  /* comments */
  async createComment(comment: CommentScheme): Promise<CommentScheme> {
    /* comment */
    const response = await firstValueFrom(
      this.httpService.post(`${this.domain}/api/v1/manager/comments`, comment),
    );

    const commentResponse = plainToInstance(CommentScheme, response.data);
    await validateOrReject(commentResponse).catch((error) => {
      this.logger.error(
        `Invalid creation of comments schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid creation of comments schema.',
      );
    });

    /* owner */
    const userResponse = await firstValueFrom(
      this.httpService.get(
        `${this.domain}/api/v1/manager/user/${commentResponse.userId}`,
      ),
    );

    const ownerComment = plainToInstance(UserResponseScheme, userResponse.data);
    await validateOrReject(ownerComment).catch((error) => {
      this.logger.error(
        `Invalid lecture of owner schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid lecture of owner schema.',
      );
    });

    /* delegates */
    const responseDelegate = await firstValueFrom(
      this.httpService.get<string[]>(
        `${this.domain}/api/v1/manager/task/${commentResponse.taskId}/delegates`,
      ),
    );
    const delegates = responseDelegate.data;

    delegates.forEach((clientId: string) => {
      void this.notifierService.newComment(
        clientId,
        ownerComment,
        commentResponse,
      );
    });

    return commentResponse;
  }
  async readComments(taskId: string): Promise<CommentScheme[]> {
    const response = await firstValueFrom(
      this.httpService.get<any[]>(
        `${this.domain}/api/v1/manager/task/${taskId}/comments`,
      ),
    );

    const commentsResponse = plainToInstance(CommentScheme, response.data);
    await validateOrReject(commentsResponse).catch((error) => {
      this.logger.error(
        `Invalid lecture comments schema from manager service: ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(
        'Invalid lecture of comments schema.',
      );
    });

    return commentsResponse;
  }
}
