import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TaskUpdater {
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title: string;

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  description: string;

  @IsDate({ message: 'Date of completion must a valid date.' })
  @IsOptional()
  dueDate: Date;

  @IsUUID('4', { message: 'Delegate user ID must be a valid UUID.' })
  @IsOptional()
  delegateUser: string;

  @IsUUID('4', { message: 'Delegate team ID must be a valid UUID.' })
  @IsOptional()
  delegateTeam: string;

  @IsDate({ message: 'Date of update must a valid date.' })
  updatedAt: Date;
}
