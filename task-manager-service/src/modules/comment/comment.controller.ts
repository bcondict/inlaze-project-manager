import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from 'src/domain/entities/comment/comment.entity';

@Controller({ version: '1', path: 'manager/comments' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() comment: CommentEntity) {
    return this.commentService.createComment(comment);
  }
  @Get('/:commentId')
  async readComment(
    @Param('commentId') commentId: string,
  ): Promise<CommentEntity> {
    return this.commentService.readComment(commentId);
  }

  @Get('/task/:taskId')
  async readTaskComments(
    @Param('taskId') taskId: string,
  ): Promise<CommentEntity[]> {
    return this.commentService.readTaskComments(taskId);
  }
}
