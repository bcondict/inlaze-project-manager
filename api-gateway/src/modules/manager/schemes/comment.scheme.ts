import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommentScheme {
  @IsUUID('4', { message: 'Comment ID must be a valid UUID.' })
  id: string;

  @IsUUID('4', { message: 'User ID must be a valid UUID.' })
  userId: string;

  @IsUUID('4', { message: 'Task ID must be a valid UUID.' })
  taskId: string;

  @IsNotEmpty({ message: 'Content is required.' })
  @IsString({ message: 'Content must be a string.' })
  content: string;

  @IsDate({ message: 'Date of creation must a valid date.' })
  createdAt: Date;

  @IsDate({ message: 'Date of update must a valid date.' })
  updatedAt: Date;
}
