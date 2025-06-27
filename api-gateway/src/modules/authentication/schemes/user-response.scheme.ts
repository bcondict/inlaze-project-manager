import { IsNotEmpty, IsString, IsEmail, IsUUID, IsDate } from 'class-validator';

export class UserResponseScheme {
  @IsUUID('4', { message: 'User ID must be a valid UUID.' })
  id: string;

  @IsNotEmpty({ message: 'First name is required.' })
  @IsString({ message: 'First name must be a string.' })
  firstName: string;

  @IsNotEmpty({ message: 'Middle name is required.' })
  @IsString({ message: 'Middle name must be a string.' })
  middleName: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString({ message: 'Last name must be a string.' })
  lastName: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString({ message: 'Phone number must be a string.' })
  secondLastName: string;

  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @IsDate({ message: 'Date of creation must be a valid date string.' })
  createdAt: Date;

  @IsDate({ message: 'Date of update must be a valid date string.' })
  updatedAt: Date;
}
