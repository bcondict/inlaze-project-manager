import { Injectable, Logger } from '@nestjs/common';
import { ProjectEntitiy } from 'src/domain/entities/project/project.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ProjectService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }
  async createProject(project: ProjectEntitiy): Promise<ProjectEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdProject = await queryRunner.manager.save(project);

      await queryRunner.commitTransaction();

      return createdProject;
    } catch (err) {
      this.logger.log('Error creating project on project service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating project on project service');
  }

  async readProjects(): Promise<ProjectEntitiy[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const projects = await queryRunner.manager.find(ProjectEntitiy);
      this.logger.log(`Found ${projects.length} projects`);
      return projects;
    } catch (error) {
      this.logger.error(`Error reading projects: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async readProject(projectId: string): Promise<ProjectEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const project = await queryRunner.manager.findOneOrFail(ProjectEntitiy, {
        where: { id: projectId },
      });
      return project;
    } catch (error) {
      this.logger.error(`Error reading project ${projectId}: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
