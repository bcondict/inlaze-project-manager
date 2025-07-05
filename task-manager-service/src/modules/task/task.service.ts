import { Injectable, Logger } from '@nestjs/common';
import { TaskEntity } from 'src/domain/entities/task/task.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TaskService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }

  async createTask(task: TaskEntity): Promise<TaskEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTask = await queryRunner.manager.save<TaskEntity>(task);

      await queryRunner.commitTransaction();

      return newTask;
    } catch (err) {
      this.logger.log('Error creating project task on task service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating project task on task service: ');
  }
  async readProjectTasks(projectId: string): Promise<TaskEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      const tasks = await queryRunner.manager.find(TaskEntity, {
        where: { projectId },
      });

      this.logger.log(`Found ${tasks.length} tasks for project ${projectId}`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error reading project tasks: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async readTask(taskId: string): Promise<TaskEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const task = await queryRunner.manager.findOneOrFail(TaskEntity, {
      where: { id: taskId },
    });

    await queryRunner.release();
    return task;
  }

  async updateTask(taskId: string, task: Partial<TaskEntity>): Promise<object> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const newTask = await queryRunner.manager.update(
      TaskEntity,
      { id: taskId },
      task,
    );

    await queryRunner.release();

    return { message: 'Task updated successfully', task: newTask };
  }

  async deleteTask(taskId: string): Promise<object> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(TaskEntity, { id: taskId });
      return { message: 'Task deleted successfully!' };
    } catch (err) {
      this.logger.log('Error deleting task on task service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    throw new Error('Error deleting task on task service');
  }
}
