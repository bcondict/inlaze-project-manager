import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TeamScheme {
  @IsUUID('4', { message: 'Team ID must be a valid UUID.' })
  id: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsDate({ message: 'Date of creation must a valid date.' })
  createdAt: Date;

  @IsDate({ message: 'Date of update must a valid date.' })
  updatedAt: Date;
}
