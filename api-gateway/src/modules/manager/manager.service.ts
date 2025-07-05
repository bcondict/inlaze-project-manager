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
  private readonly logger = new Logger(ManagerService.name);
  
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly notifierService: NotifierService,
  ) {}

  private get domain(): string {
    const taskManagerUrl = this.configService.get<string>('microservices.taskManager');
    if (!taskManagerUrl) {
      this.logger.error('Task Manager service URL is not configured.');
      throw new InternalServerErrorException(
        'Task Manager domain not configured.',
      );
    }
    return taskManagerUrl;
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

    // Validate each project in the array
    if (Array.isArray(projectsResponse)) {
      for (const project of projectsResponse) {
        await validateOrReject(project).catch((error) => {
          this.logger.error(
            `Invalid project schema in projects list: ${JSON.stringify(error)}`,
          );
          throw new InternalServerErrorException(
            'Invalid project schema in projects list.',
          );
        });
      }
    } else {
      // If it's not an array, validate as single object
      await validateOrReject(projectsResponse).catch((error) => {
        this.logger.error(
          `Invalid lecture projects schema from manager service: ${JSON.stringify(error)}`,
        );
        throw new InternalServerErrorException(
          'Invalid lecture projects schema.',
        );
      });
    }

    return projectsResponse;
  }

  /* tasks */
  async readProjectTasks(projectId: string): Promise<TaskScheme[]> {
    const response = await firstValueFrom(
      this.httpService.get<any[]>(
        `${this.domain}/api/v1/manager/projects/${projectId}/tasks`,
      ),
    );

    this.logger.log(`Raw response from Task Manager: ${JSON.stringify(response.data)}`);

    const tasksResponse = plainToInstance(TaskScheme, response.data);
    
    this.logger.log(`Transformed response: ${JSON.stringify(tasksResponse)}`);
    
    // Validate each task in the array
    if (Array.isArray(tasksResponse)) {
      this.logger.log(`Validating ${tasksResponse.length} tasks`);
      for (const task of tasksResponse) {
        await validateOrReject(task).catch((error) => {
          this.logger.error(
            `Invalid task schema in project tasks: ${JSON.stringify(error)}`,
          );
          throw new InternalServerErrorException(
            'Invalid task schema in project tasks.',
          );
        });
      }
    } else {
      // If it's not an array, validate as single object
      this.logger.log('Validating single task object');
      await validateOrReject(tasksResponse).catch((error) => {
        this.logger.error(
          `Invalid lecture project tasks schema from manager service: ${JSON.stringify(error)}`,
        );
        throw new InternalServerErrorException(
          'Invalid lecture project tasks schema.',
        );
      });
    }

    return tasksResponse;
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
    
    // Validate each team in the array
    if (Array.isArray(teamsResponse)) {
      for (const team of teamsResponse) {
        await validateOrReject(team).catch((error) => {
          this.logger.error(
            `Invalid team schema in teams list: ${JSON.stringify(error)}`,
          );
          throw new InternalServerErrorException('Invalid team schema in teams list.');
        });
      }
    } else {
      // If it's not an array, validate as single object
      await validateOrReject(teamsResponse).catch((error) => {
        this.logger.error(
          `Invalid lecture of teams schema from manager service: ${JSON.stringify(error)}`,
        );
        throw new InternalServerErrorException('Invalid lecture of team schema.');
      });
    }

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
    
    // Validate each comment in the array
    if (Array.isArray(commentsResponse)) {
      for (const comment of commentsResponse) {
        await validateOrReject(comment).catch((error) => {
          this.logger.error(
            `Invalid comment schema in comments list: ${JSON.stringify(error)}`,
          );
          throw new InternalServerErrorException(
            'Invalid comment schema in comments list.',
          );
        });
      }
    } else {
      // If it's not an array, validate as single object
      await validateOrReject(commentsResponse).catch((error) => {
        this.logger.error(
          `Invalid lecture comments schema from manager service: ${JSON.stringify(error)}`,
        );
        throw new InternalServerErrorException(
          'Invalid lecture of comments schema.',
        );
      });
    }

    return commentsResponse;
  }
}
