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

    try {
      const comments = await queryRunner.manager.find(CommentEntity, {
        where: { taskId },
      });
      this.logger.log(`Found ${comments.length} comments for task ${taskId}`);
      return comments;
    } catch (error) {
      this.logger.error(`Error reading task comments: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async readComment(commentId: string): Promise<CommentEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const comment = await queryRunner.manager.findOneOrFail(CommentEntity, {
        where: { id: commentId },
      });
      return comment;
    } catch (error) {
      this.logger.error(`Error reading comment ${commentId}: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
