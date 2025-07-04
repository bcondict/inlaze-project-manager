import { Injectable, Logger } from '@nestjs/common';
import { TaskStateEntitiy } from 'src/domain/entities/task/taskState.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TaskStateService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {
    this.logger = new Logger();
  }

  async createTaskState(taskState: TaskStateEntitiy) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newTaskState = await queryRunner.manager.save(taskState);

      await queryRunner.commitTransaction();

      return newTaskState;
    } catch (err) {
      this.logger.log(
        'Error creating a task state on taskState service: ',
        err,
      );
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating a task state on taskState service: ');
  }
  async readTaskState(taskId: string): Promise<TaskStateEntitiy> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const taskState = queryRunner.manager.findOneOrFail(TaskStateEntitiy, {
      where: { id: taskId },
      order: { createdAt: 'DESC' },
    });

    await queryRunner.release();
    return taskState;
  }
  async deleteTaskState(taskStateId: string, taskId: string): Promise<object> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const taskStateCount = await queryRunner.manager.countBy(
        TaskStateEntitiy,
        { taskId },
      );

      if (taskStateCount < 2) {
        return { message: "Unable to delete taskState as is there's one left" };
      }

      await queryRunner.manager.delete(TaskStateEntitiy, {
        where: { id: taskStateId },
      });
      return { message: 'TaskState deleted succesfully' };
    } catch (err) {
      this.logger.log('Error deleting task state on taskState service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error deleting task state on taskState service: ');
  }
}
