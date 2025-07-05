import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TaskScheme {
  @IsUUID('4', { message: 'Task ID must be a valid UUID.' })
  id: string;

  @IsUUID('4', { message: 'Project ID must be a valid UUID.' })
  projectId: string;

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  description: string;

  @IsDate({ message: 'Date of completion must a valid date.' })
  dueDate: Date;

  @IsUUID('4', { message: 'Delegate user ID must be a valid UUID.' })
  delegateUser: string;

  @IsUUID('4', { message: 'Delegate team ID must be a valid UUID.' })
  delegateTeam: string;

  @IsDate({ message: 'Date of creation must a valid date.' })
  createdAt: Date;

  @IsDate({ message: 'Date of update must a valid date.' })
  updatedAt: Date;
}
