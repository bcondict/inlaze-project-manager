import { IsString, IsNotEmpty, IsJWT, IsNumber } from 'class-validator';

export class JwtResponseScheme {
  @IsNotEmpty({ message: 'Access token should not be empty.' })
  @IsString({ message: 'Access token must be a string.' })
  @IsJWT({ message: 'Access token must be a valid JWT.' })
  accessToken: string;

  @IsNotEmpty({ message: 'Refresh token should not be empty.' })
  @IsString({ message: 'Refresh token must be a string.' })
  refreshToken: string;

  @IsNotEmpty({ message: 'Expires in should not be empty.' })
  @IsNumber({}, { message: 'Expires in must be a number.' })
  expiresIn: number;
}
