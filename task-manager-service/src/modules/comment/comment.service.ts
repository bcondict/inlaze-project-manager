import { Injectable, Logger } from '@nestjs/common';
import { CommentEntity } from 'src/domain/entities/comment/comment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentService {
  private logger: Logger;
  constructor(private readonly dataSource: DataSource) {}

  async createComment(comment: CommentEntity): Promise<CommentEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newComment = await queryRunner.manager.save<CommentEntity>(comment);

      await queryRunner.commitTransaction();

      return newComment;
    } catch (err) {
      this.logger.log('Error creating comment on comment service: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    throw new Error('Error creating comment on comment service: ');
  }

  async readTaskComments(taskId: string): Promise<CommentEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const comments = queryRunner.manager.find(CommentEntity, {
      where: { taskId },
    });

    await queryRunner.release();
    return comments;
  }

  async readComment(commentId: string): Promise<CommentEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const task = await queryRunner.manager.findOneOrFail(CommentEntity, {
      where: { id: commentId },
    });

    await queryRunner.release();
    return task;
  }
}
